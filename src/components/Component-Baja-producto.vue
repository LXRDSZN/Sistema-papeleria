<script setup>
// Importamos ref para crear las variables reactivas
import { ref, onMounted } from 'vue';
import { obtenerProductos } from '@/backend/services/api'; // Asegúrate de que la ruta sea correcta

// Importamos Axios para hacer la solicitud HTTP
import axios from 'axios';
// Importamos el toast para notificaciones
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones
// Importamos useRouter para redirigir
import { useRouter } from 'vue-router';

// Variables del formulario
const formaEliminacion = ref(''); // Selección de "Forma de Eliminar"
const datoSeleccionado = ref(''); // Código de barras o nombre del producto

// Inicializamos el toast para notificaciones
const toast = useToast();

// Inicializamos el router para redirecciones
const router = useRouter();

// Función para eliminar producto
const eliminarProducto = async () => {
  if (!formaEliminacion.value || !datoSeleccionado.value) {
    toast.error('Por favor, completa todos los campos antes de continuar.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    // Llamada a la API para eliminar el producto
    const response = await axios.post('http://localhost:5000/api/auth/bajaproducto', {
      formaEliminacion: formaEliminacion.value,
      datoSeleccionado: datoSeleccionado.value,
    });

    // Verifica la respuesta del servidor
    if (response.data.success) {
      toast.success('Producto eliminado exitosamente.', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });

      // Verifica que la redirección se ejecute correctamente
      console.log("Redirigiendo al panel..."); // Verificar si llega aquí
      setTimeout(() => {
        router.push('/panel'); // Redirigir al panel
      }, 750); // Tiempo de redirección al panel

      // Limpiar los campos del formulario
      formaEliminacion.value = '';
      datoSeleccionado.value = '';
    } else {
      toast.error(response.data.message || 'Error al intentar eliminar el producto.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    toast.error('Error del servidor. Intente nuevamente más tarde.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
};

// Variable para almacenar los productos
const productos = ref([]);  // Almacenará los productos obtenidos de la API

// Obtener los productos cuando el componente se monta
onMounted(async () => {
  try {
    // Llamamos a la función obtenerProductos que hace la solicitud
    productos.value = await obtenerProductos();
    console.log('Productos obtenidos:', productos.value);  // Para verificar los datos en la consola
  } catch (err) {
    console.error('Error al obtener los productos:', err);
    toast.error('No se pudieron cargar los productos. Intenta más tarde.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
});
</script>



<template>
  <div class="sys-baja-producto">
    <div class="panel-baja">
      <h3>Bajas de productos</h3>

      <!-- Formulario -->
      <div class="datos-generales">
        <div class="datos-usuario">
          <label for="formaEliminacion">Forma de Eliminar</label>
          <select id="formaEliminacion" v-model="formaEliminacion">
            <option value="">Seleccione la forma</option>
            <option value="Codigo de Barras">Código de Barras</option>
            <option value="Nombre">Nombre</option>
          </select>
        </div>
      </div>

      <div class="dato-seleccionado">
        <label for="datoSeleccionado">Dato Seleccionado</label>
        <input
          id="datoSeleccionado"
          type="text"
          placeholder="Ingrese el dato correspondiente a la forma seleccionada"
          v-model="datoSeleccionado"
        />
      </div>

      <!-- Botón -->
      <button class="boton-eliminar-producto" @click="eliminarProducto">
        Eliminar
      </button>

      <table border="1" class="usuarios-table">
        <thead>
          <tr>
            <th>CODIGO DE BARRAS</th>
            <th>CATEGORIA</th>
            <th>NOMBRE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.codigo_barras }}</td>
            <td>{{ producto.categoria }}</td>
            <td>{{ producto.nombre }}</td>
          </tr>
        </tbody>
      </table>
      
    </div>
  </div>
</template>


<style scoped>

.usuarios-table {
  width: 100%;
  margin-top: 4rem;
  border-collapse: collapse;
  border: 1px solid #ddd;
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
.sys-baja-producto {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto;
  margin-left: 250px;
  padding: 2rem;
}

/* Panel de contenido */
.panel-baja {
  display: block;
  margin: 100px auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 70%;
}

h3 {
  color: #003366; /* Tono azul similar al de la barra de navegación */
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.datos-generales {
  display: flex;
  gap: 1rem;
}

.datos-usuario {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

.dato-seleccionado {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 55%;
}

label {
  font-size: 1rem;
  color: #333;
}

input[type="text"],
input[type="number"],
select {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.boton-eliminar-producto {
  display: block;
  margin: 0 auto;
  width: 30%;
  padding: 0.8rem 2rem;
  background-color: #003366; /* Azul oscuro para el botón */
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.boton-eliminar-producto:hover {
  background-color: #00509e; /* Color más claro al pasar el ratón */
}
</style>
