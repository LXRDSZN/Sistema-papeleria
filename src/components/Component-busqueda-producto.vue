<script setup>
// Importamos ref para crear las variables reactivas y onMounted para la lógica al montar el componente
import { ref, onMounted } from 'vue';
import { obtenerProductos } from '@/backend/services/api'; // Asegúrate de que la ruta sea correcta

// Importamos el toast para notificaciones
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Inicializamos el toast para notificaciones
const toast = useToast();

// Variables reactivas
const productos = ref([]); // Lista de productos
const tipoBusqueda = ref('Seleccione la forma'); // Tipo de búsqueda (Código de Barras o Nombre)
const datoBusqueda = ref(''); // Valor ingresado por el usuario

// Obtener los productos al montar el componente
onMounted(async () => {
  try {
    // Llamamos a la API para obtener los productos
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

// Función para realizar la búsqueda del producto
const realizarBusqueda = () => {
  // Validamos que los campos no estén vacíos
  if (tipoBusqueda.value === 'Seleccione la forma' || !datoBusqueda.value.trim()) {
    toast.error('Por favor, selecciona una forma de búsqueda y escribe un dato válido.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  // Buscar el producto según el tipo de búsqueda
  const productoEncontrado = productos.value.find(producto => {
    if (tipoBusqueda.value === 'Codigo de Barras') {
      return producto.codigo_barras === datoBusqueda.value.trim();
    } else if (tipoBusqueda.value === 'Nombre') {
      return producto.nombre.toLowerCase() === datoBusqueda.value.trim().toLowerCase();
    }
    return false;
  });

  // Notificar si el producto fue encontrado o no
  if (productoEncontrado) {
    toast.success(
      `Producto en existencia: ${productoEncontrado.nombre}. Cantidad: ${productoEncontrado.cantidad}.`,
      {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      }
    );
  } else {
    toast.error('Producto no encontrado. Verifica los datos ingresados.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
};
</script>

<template>
  <div class="sys-panel-busqueda">
    <div class="panel-busqueda">
      <h3>Búsqueda de Producto</h3>

      <!-- Campo de selección de tipo de búsqueda -->
      <div class="selecciones">
        <div class="datos-usuario">
          <label>Forma de Búsqueda</label>
          <select v-model="tipoBusqueda">
            <option disabled value="Seleccione la forma">Seleccione la forma</option>
            <option>Codigo de Barras</option>
            <option>Nombre</option>
          </select>
        </div>
      </div>

      <!-- Campo para ingresar el dato de búsqueda -->
      <div class="dato-seleccionado">
        <label>Dato Seleccionado</label>
        <input 
          type="text" 
          v-model="datoBusqueda" 
          placeholder="Ingrese el dato correspondiente de la forma seleccionada" 
        />
      </div>

      <!-- Tabla de productos -->
      <table border="1" class="usuarios-table" title="Tabla de búsqueda">
        <thead>
          <tr>
            <th>CB</th>
            <th>NOMBRE</th>
            <th>STOCK</th>
            <th>PRECIO COMPRA</th>
            <th>PRECIO VENTA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.codigo_barras">
            <td>{{ producto.codigo_barras }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.cantidad }}</td>
            <td>{{ producto.precio_compra }}</td>
            <td>{{ producto.precio_venta }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Botón de búsqueda -->
      <button class="boton-eliminar-busqueda" @click="realizarBusqueda">Buscar</button>
    </div>
  </div>
</template>


<style scoped>
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
/* Contenedor principal del panel, para que ocupe toda la pantalla */
.sys-panel-busqueda {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto; /* Permite el desplazamiento solo vertical */
  margin-left: 250px; 
  padding: 2rem;
}

/* Panel de contenido */
.panel-busqueda {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-height: 100%; 
}

/* Título del panel */
h3 {
  color: #003366;
  font-size: 2.5rem;
  margin-bottom: .2rem;
}

.selecciones {
  display: flex;
  gap: 1rem;
}

.datos-usuario {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

label{
  font-size: 1.5rem;
  color: #333;
}

input[type="text"], select {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.dato-seleccionado {
  display: flex;
  flex-direction: column;
  width: 50%;
}

/* Tabla */
.tabla-busqueda {
  color: #000000;
  border: 1px solid #ccc;
  border-radius: 5pxC
}

.boton-eliminar-busqueda {
  display: block;
  margin: 0 auto;
  width: 20%;
  padding: 0.8rem 1.5rem;
  background-color: #00509e;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.boton-eliminar:hover {
  background-color: #003366;
}
</style>