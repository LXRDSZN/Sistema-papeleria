<script setup>
// Importamos ref para crear las variables reactivas
import { ref, onMounted } from 'vue';
import { obtenerUsuarios } from '@/backend/services/api'; // Asegúrate de que la ruta sea correcta

// Importamos Axios para hacer la solicitud HTTP
import axios from 'axios';
// Importamos el toast para notificaciones
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones
// Importamos useRouter para redirigir
import { useRouter } from 'vue-router';

// Variables del formulario
const curp = ref('');
const username = ref('');

// Inicializamos el toast para notificaciones
const toast = useToast();

// Inicializamos el router para redirecciones
const router = useRouter();

// Función para eliminar usuario
const eliminarUsuario = async () => {
  // Validamos que los campos no estén vacíos
  if (!curp.value && !username.value) {
    toast.error('Por favor, ingresa el CURP o el nombre de usuario.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    // Realizamos la solicitud POST para eliminar el usuario
    const response = await axios.post('http://localhost:5000/api/auth/bajausuario', {
      curp: curp.value,
      username: username.value,
    });

    // Verifica la respuesta del servidor
    if (response.data.message === 'Usuario borrado exitosamente') {
      toast.success('Usuario borrado exitosamente.', {
        position: 'top-right',
        duration: 2000, // Duración del mensaje de éxito
        dismissible: true,
      });

      // Añadimos un pequeño retraso antes de redirigir al panel
      setTimeout(() => {
        router.push('/panel'); // Redirigir al panel
      }, 750); // Tiempo de redirección al panel
    } else {
      toast.error('No se pudo borrar el usuario. Intente nuevamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    toast.error('Hubo un problema con el usuario. Intenta nuevamente.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
};
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
  <div class="delete-user">
    <h2 class="title">Eliminar Usuario</h2>
    <p class="description">Por favor, ingrese el CURP o el nombre de usuario del usuario que desea eliminar. Esta acción es irreversible.</p>
    
    <section class="field">
      <label for="curp">CURP:</label>
      <input type="text" id="curp" v-model="curp" placeholder="Ingrese el CURP" />
    </section>

    <section class="field">
      <label for="username">Usuario:</label>
      <input type="text" id="username" v-model="username" placeholder="Ingrese el Usuario" />
    </section>

    <div class="warning-icon">
      ⚠️
    </div>

     <!-- Botón de registro -->
     <button class="delete-button" @click="eliminarUsuario">Registrar</button>
  
     <!-- Mostrar mensajes de éxito y error -->
     <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
     <p v-if="successMessage" style="color: green">{{ successMessage }}</p>

     <table border="1" class="usuarios-table">
      <thead>
        <td>CURP</td>
        <td>USUARIO</td>
        <td>ROL ID</td>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.curp">
          <td>{{ usuario.curp }}</td>
          <td>{{ usuario.usuario}}</td>
          <td>{{ usuario.rol_id}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>


/* Estilos para la tabla */
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
.delete-user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    max-width: 500px;
    margin: 2rem auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    position: relative;
    margin-left: calc(100% - 60%);
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: rgb(255, 69, 58);
}

.description {
  color: rgb(93, 95, 93);
  margin-bottom: 1.5rem;
}

.field {
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: rgb(93, 95, 93);
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #ff4b4b;
  box-shadow: 0px 0px 8px rgba(255, 69, 58, 0.4);
  outline: none;
}

.warning-icon {
  font-size: 2rem;
  color: #ff4b4b;
  margin: 1rem 0;
  animation: shake 0.3s ease-in-out;
  animation-iteration-count: 2;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}

.delete-button {
  width: 100%;
  padding: 0.75rem;
  background-color: rgb(255, 69, 58);
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.delete-button:hover {
  background-color: rgb(194, 48, 41);
  transform: translateY(-2px);
}
</style>
