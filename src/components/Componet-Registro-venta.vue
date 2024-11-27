<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Solicitudes HTTP
import { obtenerProductos, actualizarStock } from '@/backend/services/api'; // Asegúrate de que la ruta sea correcta
import { useToast } from 'vue-toast-notification'; // Para las notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo para notificaciones

// Variables reactivas
const productos = ref([]); // Lista de productos del inventario
const productosVenta = ref([]); // Productos agregados a la venta
const codigoBarras = ref('');
const cantidad = ref(0);
const totalVenta = ref(0);
const producto_id = ref(''); // Definir producto_id
const precio_total = ref(0); // Definir precio_total
// Inicializa el toast para notificaciones
const toast = useToast();

// Obtener los productos del inventario al montar el componente
onMounted(async () => {
  try {
    productos.value = await obtenerProductos();
    console.log('Productos obtenidos:', productos.value); // Verificar en consola
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    toast.error('No se pudieron cargar los productos. Intente nuevamente más tarde.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
});

// Función para guardar la venta solo en la tabla (sin backend)
const guardarVenta = async () => {
  if (!codigoBarras.value || !cantidad.value) {
    toast.error('Por favor, ingrese el código de barras y la cantidad antes de continuar.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    // Buscar el producto en el inventario usando el código de barras
    const producto = productos.value.find((p) => p.codigo_barras === codigoBarras.value);

    if (producto) {
      if (producto.cantidad < cantidad.value) {
        toast.error('No hay suficiente stock para el producto seleccionado.', {
          position: 'top-right',
          duration: 5000,
          dismissible: true,
        });
        return;
      }

      const precioCompra = producto.precio_compra;
      const subtotal = cantidad.value * precioCompra;
      totalVenta.value += subtotal;

      // Generar fecha actual
      const fechaActual = new Date().toISOString().split('T')[0];

      // Verificar si el producto ya está en productosVenta
      const productoEnVenta = productosVenta.value.find(
        (p) => p.codigo_barras === codigoBarras.value
      );

      if (productoEnVenta) {
        // Si ya existe, sumar la cantidad y recalcular el precio total
        productoEnVenta.cantidad += cantidad.value;
        productoEnVenta.precio_venta += subtotal;
      } else {
        // Si no existe, agregarlo como un nuevo producto
        productosVenta.value.push({
          codigo_barras: codigoBarras.value,
          nombre: producto.nombre,
          cantidad: cantidad.value,
          precio_compra: precioCompra,
          precio_venta: subtotal,
          fecha: fechaActual,
          eliminar: false // Agregar propiedad para el checkbox
        });
      }

      // Actualizar la cantidad del producto en el inventario
      producto.cantidad -= cantidad.value;

      // Limpiar los campos del formulario
      codigoBarras.value = '';
      cantidad.value = 0;

      toast.success('Producto agregado a la venta.', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });
    } else {
      toast.error('El producto no existe. Verifique el código de barras.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    }
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    toast.error('Error del servidor. Intente nuevamente más tarde.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
};

// Función para eliminar productos seleccionados
function eliminarSeleccionados() {
  // Filtrar los productos que no están marcados para eliminar
  productosVenta.value = productosVenta.value.filter((producto) => !producto.eliminar);
}

// Función para registrar la venta completa
const registrarVenta = async () => {
  if (productosVenta.value.length === 0) {
    toast.error('No hay productos para registrar en la venta.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    // Recorrer los productos en la venta y enviarlos al backend
    for (const producto of productosVenta.value) {
      const response = await axios.post('http://localhost:5000/api/auth/ventas', {
        producto_id: producto.codigo_barras,
        cantidad: producto.cantidad,
        precio_total: producto.precio_venta,
      });

      // Manejar la respuesta basándonos en el indicador success
      if (response.data.success) {
        // Actualizar la cantidad del producto en el backend
        try {
          await actualizarStock(producto.codigo_barras, -producto.cantidad);
          toast.success(`Venta registrada para el producto: ${producto.nombre}`, {
            position: 'top-right',
            duration: 2000,
            dismissible: true,
          });
        } catch (error) {
          console.error('Error al actualizar la cantidad del producto:', error);
          toast.error(`Venta registrada, pero no se pudo actualizar el stock del producto: ${producto.nombre}. Verifique manualmente.`, {
            position: 'top-right',
            duration: 5000,
            dismissible: true,
          });
        }
      } else {
        toast.error(`Error al registrar el producto: ${producto.nombre}`, {
          position: 'top-right',
          duration: 5000,
          dismissible: true,
        });
      }
    }

    // Limpiar la lista de productos en la venta después del registro exitoso
    productosVenta.value = [];
    totalVenta.value = 0;
  } catch (error) {
    console.error('Error al registrar la venta:', error);
    toast.error('Hubo un problema con el servidor. Intenta nuevamente.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
};
</script>
<template>
  <div class="sistema-panel-venta">
    <div class="panel-venta">
      <h3>Venta de Productos</h3>

      <!-- Formulario de ingreso -->
      <div class="formulario-datos-usuario">
        <div class="formulario-datos">
          <label>Código de Barras</label>
          <input
            v-model="codigoBarras"
            type="text"
            placeholder="Ingrese el código de barras"
          />
        </div>
        <div class="formulario-datos">
          <label>Cantidad</label>
          <input
            v-model.number="cantidad"
            type="number"
            placeholder="Ingrese la cantidad del producto"
          />
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="botones-accion">
        <button @click="guardarVenta" class="boton-guardar">Guardar</button>
        <button @click="eliminarSeleccionados" class="boton-eliminar">Eliminar Fila</button>
      </div>

      <!-- Tabla de productos en la venta -->
      <table border="1" class="usuarios-table" title="Tabla de búsqueda">
        <thead>
          <tr>
            <th>ELIMINAR</th>
            <th>CB</th>
            <th>NOMBRE</th>
            <th>CANTIDAD</th>
            <th>PRECIO UNITARIO</th>
            <th>PRECIO SUMA</th>
            <th>FECHA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productosVenta" :key="producto.codigo_barras">
            <td>
              <input
                type="checkbox"
                v-model="producto.eliminar"
                @change="toggleEliminar(producto)"
              />
            </td>
            <td>{{ producto.codigo_barras }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.cantidad }}</td>
            <td>{{ producto.precio_compra }}</td>
            <td>{{ producto.precio_venta }}</td>
            <td>{{ producto.fecha }}</td>
          </tr>
        </tbody>
      </table>
        <!-- Botón para realizar la venta -->
        <button class="boton-venta" @click="registrarVenta"> Confirmar </button>
      <!-- Total de venta -->
      <div class="formulario-datos-usuario">
        <div class="formulario-datos">
          <label>Total de Venta</label>
          <p class="precio"> ${{ totalVenta }} </p>
        </div>
      </div>
      
      <!-- Botón para realizar la venta -->
      <button class="boton-venta" @click="registrarVenta" :disabled="productosVenta.length === 0">
        Realizar Venta
      </button>
    </div>
  </div>
</template>





<style scoped>.field {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 0;
}

.field label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 12px; /* Puedes ajustar el tamaño de la fuente */
}

.field input {
  width: 120px; /* Ajusta el tamaño del campo de entrada */
  padding: 6px;
  font-size: 12px; /* Ajusta el tamaño de la fuente */
  border-radius: 4px;
  border: 1px solid #ccc;
}
.usuarios-table {
  width: 100%;
  margin-top: 4rem;
  border-collapse: collapse;
  border: 1px solid #ff0000;
}

.usuarios-table td, .usuarios-table th {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.usuarios-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.usuarios-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.usuarios-table tr:hover {
  background-color: #f1f1f1;
}

/* Estilo para las celdas de la tabla */
.usuarios-table td {
  font-size: 14px;
  color: #333;
}

/* Ajuste de tamaño de las celdas */
.usuarios-table td, .usuarios-table th {
  word-wrap: break-word;
  max-width: 200px;
}
/* Contenedor principal del panel */
.sistema-panel-venta {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto;
  margin-left: 250px;
  padding: 1rem;
}

/* Panel de contenido */
.panel-venta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-height: 100%;
}

/* Título del panel */
h3 {
  color: #003366;
  font-size: 2.5rem;
  margin-bottom: .2rem;
}

/* Contenedor del formulario */
.formulario-datos-usuario {
  display: flex;
  gap: 1rem;
}

/* Contenedor de cada campo */
.formulario-datos {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

label, p {
  font-size: 1.5rem;
  color: #333;
}

.precio {
  border-bottom: 2px solid black; 
  color: green; 
  text-align: left;
  width: 25%;
}

input[type="text"], input[type="number"], select {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

/* Botones de acción */
.botones-accion {
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
}

.boton-guardar, .boton-eliminar {
  width: 20%;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
}

.boton-guardar {
  background-color: #003366;
}

.boton-eliminar {
  background-color: #cc0000;
}

/* Tabla */
.tabla-venta {
  color: #000000;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Generar reporte */
.generar-reporte {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.boton-venta {
  width: 20%;
  padding: 0.8rem 1.5rem;
  background-color: #009e22;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.boton-generar-reporte {
  width: 20%;
  padding: 0.8rem 1.5rem;
  background-color: #00509e;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.boton-generar-reporte:hover {
  background-color: #003366;
}
</style>
