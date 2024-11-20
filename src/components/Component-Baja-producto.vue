<script setup>
import { ref } from 'vue'; // Variables reactivas
import axios from 'axios'; // Solicitudes HTTP
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Variables reactivas para los campos del formulario
const formaEliminacion = ref(''); // Selección de "Forma de Eliminar"
const cantidadMerma = ref(''); // Cantidad de producto a eliminar
const datoSeleccionado = ref(''); // Código de barras o nombre del producto

const toast = useToast(); // Notificaciones

// Función para eliminar producto
const eliminarProducto = async () => {
  if (!formaEliminacion.value || !cantidadMerma.value || !datoSeleccionado.value) {
    toast.error('Por favor, completa todos los campos antes de continuar.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    // Solicitud HTTP al backend para eliminar el producto
    const response = await axios.post('http://localhost:5000/api/auth/bajaproducto', {
      formaEliminacion: formaEliminacion.value,
      cantidadMerma: cantidadMerma.value,
      datoSeleccionado: datoSeleccionado.value,
    });

    if (response.data.message === 'Producto eliminado exitosamente') {
      toast.success('Producto eliminado exitosamente.', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });

      // Limpiar los campos después de la eliminación exitosa
      formaEliminacion.value = '';
      cantidadMerma.value = '';
      datoSeleccionado.value = '';
    } else {
      toast.error('Hubo un error al intentar eliminar el producto. Intente nuevamente.', {
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
</script>

<template>
  <div class="sys-baja-producto">
    <div class="panel-baja">
      <h3>Bajas de productos</h3>

      <!-- Campos del formulario -->
      <div class="datos-generales">
        <div class="datos-usuario">
          <label for="formaEliminacion">Forma de Eliminar</label>
          <select id="formaEliminacion" v-model="formaEliminacion">
            <option value="">Seleccione la forma</option>
            <option value="Codigo de Barras">Código de Barras</option>
            <option value="Nombre">Nombre</option>
          </select>
        </div>

        <div class="datos-usuario">
          <label for="cantidadMerma">Cantidad (Merma)</label>
          <input
            id="cantidadMerma"
            type="number"
            placeholder="Ingrese la cantidad del producto"
            v-model="cantidadMerma"
          />
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

      <!-- Botón para eliminar el producto -->
      <button class="boton-eliminar-producto" @click="eliminarProducto">
        Eliminar
      </button>
    </div>
  </div>
</template>

<style scoped>
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
