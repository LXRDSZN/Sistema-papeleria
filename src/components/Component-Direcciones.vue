<script setup>
// Importamos los módulos necesarios
import { ref, onMounted } from 'vue'; // Variables reactivas y ciclo de vida
import axios from 'axios'; // Solicitudes HTTP
import { useToast } from 'vue-toast-notification'; // Notificaciones
import { useRoute, useRouter } from 'vue-router'; // Manejo de rutas
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Variables reactivas para los campos del formulario de dirección
const curp = ref('');
const calle = ref('');
const numero_exterior = ref('');
const numero_interior = ref('');
const colonia = ref('');
const ciudad = ref('');
const estado = ref('');
const codigo_postal = ref('');
const pais = ref('');

// Inicializa el toast para notificaciones
const toast = useToast();
const router = useRouter(); // Instancia del router para redirecciones
const route = useRoute(); // Acceso a los parámetros de la URL

// Obtener la CURP desde los query parameters al montar el componente
onMounted(() => {
  curp.value = route.query.curp || ''; // Obtenemos la CURP desde la URL
});

// Función para registrar la dirección
const registerAddress = async () => {
  // Validamos si los campos están vacíos
  if (!calle.value || !numero_exterior.value || !colonia.value || !ciudad.value || !estado.value || !codigo_postal.value || !pais.value) {
    toast.error('Por favor, completa todos los campos del formulario.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    // Realizamos la solicitud POST al backend
    const response = await axios.post('http://localhost:5000/api/auth/registrar-direccion', {
      curp: curp.value,
      calle: calle.value,
      numero_exterior: numero_exterior.value,
      numero_interior: numero_interior.value || '', // Campo opcional
      colonia: colonia.value,
      ciudad: ciudad.value,
      estado: estado.value,
      codigo_postal: codigo_postal.value,
      pais: pais.value,
    });

    // Verifica la respuesta del servidor
    if (response.data.message === 'Dirección registrada exitosamente') {
      toast.success('Dirección registrada exitosamente. Redirigiendo...', {
        position: 'top-right',
        duration: 2000, // Duración de la animación de éxito
        dismissible: true,
      });

      // Redirigir con un pequeño retraso para mostrar el mensaje
      setTimeout(() => {
        router.push('/panel'); // Redirigir al panel de control
      }, 750);
    } else {
      toast.error('Error en el registro. Intente nuevamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    }
  } catch (error) {
    console.error('Error al registrar:', error);
    toast.error('Hubo un problema con el registro. Intenta nuevamente.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
};
</script>

<template>
  <div class="sys-panel-direcciones">
    <nav class="registros">
      <RouterLink to="/Datos_de_usuario">Registrar Usuario</RouterLink>
      <RouterLink to="/Datos_de_direccion">Registrar Dirección</RouterLink>
    </nav>
    <div class="register-container">
      <section class="fields-container">
        <div class="field">
          <label for="calle">Calle:</label>
          <input type="text" id="calle" v-model="calle" placeholder="Ingrese su Calle" />
        </div>

        <div class="field">
          <label for="numero_exterior">Número Exterior:</label>
          <input type="text" id="numero_exterior" v-model="numero_exterior" placeholder="Número Exterior" />
        </div>

        <div class="field">
          <label for="numero_interior">Número Interior (Opcional):</label>
          <input type="text" id="numero_interior" v-model="numero_interior" placeholder="Número Interior" />
        </div>

        <div class="field">
          <label for="colonia">Colonia:</label>
          <input type="text" id="colonia" v-model="colonia" placeholder="Ingrese su Colonia" />
        </div>

        <div class="field">
          <label for="ciudad">Ciudad:</label>
          <input type="text" id="ciudad" v-model="ciudad" placeholder="Ingrese su Ciudad" />
        </div>

        <div class="field">
          <label for="estado">Estado:</label>
          <input type="text" id="estado" v-model="estado" placeholder="Ingrese su Estado" />
        </div>

        <div class="field">
          <label for="pais">País:</label>
          <input type="text" id="pais" v-model="pais" placeholder="Ingrese su País" />
        </div>

        <div class="field">
          <label for="codigo_postal">Código Postal:</label>
          <input type="text" id="codigo_postal" v-model="codigo_postal" placeholder="Ingrese su Código Postal" />
        </div>
      </section>

      <button class="register-button" @click="registerAddress">Registrar</button>
    </div>
  </div>
</template>

<style scoped>
.sys-panel-direcciones {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto;
  margin-left: 250px;
  padding: 1rem;
}

.registros {
  width: 100%;
  font-size: 25px;
  text-align: center;
  margin-top: 2rem;
}

.registros a.router-link-exact-active {
  color: rgb(91, 96, 91);
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.fields-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}

.field {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: rgb(93, 95, 93);
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  transition: border-color 0.3s;
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  background-color: rgb(10, 149, 255);
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.register-button:hover {
  background-color: rgb(42, 124, 186);
}
</style>
