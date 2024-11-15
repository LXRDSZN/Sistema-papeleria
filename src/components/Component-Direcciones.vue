<script setup>
// Importamos ref para crear las variables reactivas
import { ref, onMounted } from 'vue';
// Importamos Axios para hacer la solicitud HTTP
import axios from 'axios';
// Importamos useRoute para acceder a los parámetros de la URL
import { useRoute, useRouter } from 'vue-router';

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

// Variable para el mensaje de error
const errorMessage = ref('');
const router = useRouter();  // Crear una instancia del router
const route = useRoute(); // Acceder a los parámetros de la URL

// Obtener la CURP desde los query parameters de la URL al montar el componente
onMounted(() => {
  curp.value = route.query.curp;  // Acceder a la CURP desde la URL
});

// Función para registrar la dirección
const registerAddress3 = async () => {
  // Validamos si los campos están vacíos
  if (!calle.value || !numero_exterior.value || !numero_interior.value || !colonia.value || !ciudad.value || !estado.value || !codigo_postal.value || !pais.value || !curp.value) {
    errorMessage.value = 'Por favor, completa todos los campos de la dirección';
    return;
  }

  try {
    // Realizamos la solicitud POST para registrar la dirección
    const response = await axios.post('http://localhost:5000/api/auth/registrar-direccion', {
      curp: curp.value,  // Pasar la CURP como llave foránea
      calle: calle.value,
      numero_exterior: numero_exterior.value,
      numero_interior: numero_interior.value,
      colonia: colonia.value,
      ciudad: ciudad.value,
      estado: estado.value,
      codigo_postal: codigo_postal.value,
      pais: pais.value,
    });

    // Si el registro es exitoso, redirigir a otra página o limpiar los campos
    if (response.data.message === 'Dirección registrada exitosamente') {
      alert('Dirección registrada exitosamente');
      // Redirigir usando Vue Router
      router.push('/panel');  
    } else {
      errorMessage.value = 'Error al registrar la dirección. Intente nuevamente.';
    }
  } catch (error) {
    console.error('Error al registrar la dirección:', error);
    errorMessage.value = 'Error al registrar la dirección. Intente nuevamente.';
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
          <label for="numero_interior">Número Interior:</label>
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
  
      <button class="register-button" @click="registerAddress3">Registrar</button>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </div>
  </div>
</template>

  <style scoped>
  .registros {
    width: 100%;
    font-size: 25px;
    text-align: center;
    margin-top: 2rem;
  }
  
  .registros a.router-link-exact-active {
    color: rgb(91, 96, 91);
  }
  
  .registros a.router-link-exact-active:hover {
    background-color: transparent;
  }
  
  .registros a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }
  
  .registros a:first-of-type {
    border: 0;
  }
  .sys-panel-direcciones {
    position: fixed;
    top: 10;
    left: 0;
    width: calc(100% - 250px);
    height: 100vh;
    overflow-y: auto; /* Permite el desplazamiento solo vertical */
    margin-left: 250px; 
    padding: 1rem;
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
  
  input:focus {
    border-color: #007bff;
    outline: none;
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
  