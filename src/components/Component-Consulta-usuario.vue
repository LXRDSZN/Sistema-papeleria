<script setup>
import { obtenerUsuarios } from '@/backend/services/api'; // Asegúrate de que la ruta sea correcta
import { ref, onMounted } from 'vue';

const usuarios = ref([]);  // Almacenará los usuarios obtenidos de la API
// Obtener los usuarios cuando el componente se monta
onMounted(async () => {
  try {
    // Llamamos a la función obtenerUsuarios que hace la solicitud
    usuarios.value = await obtenerUsuarios();
    console.log('Usuarios obtenidos:', usuarios.value);  // Para verificar los datos en la consola
  } catch (err) {
    error.value = 'No se pudieron cargar los usuarios. Intenta más tarde.';
    console.error('Error al obtener los usuarios:', err);
  }
});

</script>

<template>
  <div class="sys-panel-consulta-usuarios">
    <div class="panel-usuarios">
      <table border="1" class="usuarios-table">
        <thead>
          <td>CURP</td>
          <td>USUARIO</td>
          <td>NOMBRE</td>
          <td>APELLIDO PATERNO</td>
          <td>APELLIDO MATERNO</td>
          <td>ROL ID</td>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.curp">
            <td>{{ usuario.curp }}</td>
            <td>{{ usuario.usuario}}</td>
            <td>{{ usuario.nombre}}</td>
            <td>{{ usuario.apellido_paterno}}</td>
            <td>{{ usuario.apellido_materno}}</td>
            <td>{{ usuario.rol_id}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal del panel, para que ocupe toda la pantalla */
.sys-panel-consulta-usuarios {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto; /* Permite el desplazamiento solo vertical */
  margin-left: 250px; 
  padding: 1rem;
}

/* Panel de contenido */
.panel-usuarios {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-height: 100%; 
}


/* Estilo para el mensaje de error */
.error-message {
  color: red;
  font-weight: bold;
  padding: 1rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  margin-bottom: 1rem;
}


/* Estilos para la tabla */
.usuarios-table {
  width: 100%;
  margin-top: 1rem;
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
</style>
