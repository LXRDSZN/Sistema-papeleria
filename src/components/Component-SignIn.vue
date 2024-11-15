
<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Definir variables reactivas
const curp = ref('');
const apellido_paterno = ref('');
const apellido_materno = ref('');
const nombre = ref('');
const correo = ref('');
const telefono = ref('');
const username = ref('');
const password = ref('');
const calle = ref('');
const numero_exterior = ref('');
const numero_interior = ref('');
const colonia = ref('');
const ciudad = ref('');
const estado = ref('');
const pais = ref('');
const codigo_postal = ref('');
const rol = ref('');
const errorMessage = ref('');

// Función para validar campos de usuario
const validateUserFields = () => {
  return curp.value && apellido_paterno.value && apellido_materno.value && nombre.value && correo.value && telefono.value && username.value && password.value && rol.value;
};

// Función para validar campos de dirección
const validateAddressFields = () => {
  return calle.value && numero_exterior.value && numero_interior.value && colonia.value && ciudad.value && estado.value && pais.value && codigo_postal.value;
};

// Función para registrar usuario
const registerUser = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/Registrar', {
      curp: curp.value,
      apellido_paterno: apellido_paterno.value,
      apellido_materno: apellido_materno.value,
      nombre: nombre.value,
      correo: correo.value,
      telefono: telefono.value,
      usuario: username.value,
      contrasena: password.value,
      rol_id: rol.value,
    });

    if (response.data.success) {
      return true; // Indica que el registro de usuario fue exitoso
    } else {
      errorMessage.value = 'Error en el registro de usuario. Intente nuevamente.';
      return false;
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    errorMessage.value = 'Error al registrar usuario. Intente nuevamente.';
    return false;
  }
};

// Función para registrar dirección
const registerAddress3 = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/Registrar', {
      calle: calle.value,
      numero_exterior: numero_exterior.value,
      numero_interior: numero_interior.value,
      colonia: colonia.value,
      ciudad: ciudad.value,
      estado: estado.value,
      codigo_postal: codigo_postal.value,
      pais: pais.value,
    });

    if (response.data.success) {
      return true; // Indica que el registro de dirección fue exitoso
    } else {
      errorMessage.value = 'Error en el registro de dirección. Intente nuevamente.';
      return false;
    }
  } catch (error) {
    console.error('Error al registrar dirección:', error);
    errorMessage.value = 'Error al registrar dirección. Intente nuevamente.';
    return false;
  }
};

// Función para manejar el registro completo
const registerCompleteUser = async () => {
  // Verificar que todos los campos de usuario y dirección estén completos
  if (!validateUserFields() && !validateAddressFields()) {
    errorMessage.value = 'Por favor, completa todos los campos de Usuario y Dirección';
    return;
  } else if (!validateUserFields()) {
    errorMessage.value = 'Por favor, completa todos los campos de Usuario';
    return;
  } else if (!validateAddressFields()) {
    errorMessage.value = 'Por favor, completa todos los campos de Dirección';
    return;
  }

  // Intentar registrar usuario y dirección
  const userRegistered = await registerUser();
  const addressRegistered = userRegistered ? await registerAddress3() : false;

  if (userRegistered && addressRegistered) {
    alert('Registro exitoso');
    clearFields(); // Limpiar campos tras el registro exitoso
    errorMessage.value = ''; // Limpiar mensaje de error
    window.location.href = '/panel';
  }
};

// Función para limpiar los campos
const clearFields = () => {
  curp.value = '';
  apellido_paterno.value = '';
  apellido_materno.value = '';
  nombre.value = '';
  correo.value = '';
  telefono.value = '';
  username.value = '';
  password.value = '';
  calle.value = '';
  numero_exterior.value = '';
  numero_interior.value = '';
  colonia.value = '';
  ciudad.value = '';
  estado.value = '';
  pais.value = '';
  codigo_postal.value = '';
  rol.value = '';
};
</script>


<template>
  <div class="register-container">
    <section class="fields-container">
      <div class="field">
        <label for="curp">CURP:</label>
        <input type="text" id="curp" v-model="curp" placeholder="Ingrese su CURP" />
      </div>

      <div class="field">
        <label for="apellido_paterno">Apellido Paterno:</label>
        <input type="text" id="apellido_paterno" v-model="apellido_paterno" placeholder="Ingrese su Apellido Paterno" />
      </div>

      <div class="field">
        <label for="apellido_materno">Apellido Materno:</label>
        <input type="text" id="apellido_materno" v-model="apellido_materno" placeholder="Ingrese su Apellido Materno" />
      </div>

      <div class="field">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" placeholder="Ingrese su Nombre" />
      </div>

      <div class="field">
        <label for="correo">Correo:</label>
        <input type="email" id="correo" v-model="correo" placeholder="Ingrese su Correo" />
      </div>

      <div class="field">
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" v-model="telefono" placeholder="Ingrese su Teléfono" />
      </div>

      <div class="field">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" placeholder="Ingrese su Usuario" />
      </div>

      <div class="field">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" placeholder="Ingrese su Contraseña" />
      </div>

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

      <div class="field">
        <label for="rol">Rol:</label>
        <input type="text" id="rol" v-model="rol" placeholder="Ingrese el Rol" />
      </div>
    </section>

    <button class="register-button" @click="registerCompleteUser">Registrar</button>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
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
