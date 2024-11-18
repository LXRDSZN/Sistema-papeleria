<template>
  <div class="login-container">
    <section class="user">
      <label for="username">Usuario:</label>
      <input type="text" id="username" v-model="username" placeholder="Ingrese su Usuario" />
    </section>

    <section class="password">
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" placeholder="Ingrese su contraseña" />
    </section>

    <button class="login-button" @click="login">Login</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
// Importamos ref para crear las variables reactivas
import { ref } from 'vue'; 
 // Importamos Axios para hacer la solicitud HTTP 
import axios from 'axios'; 

// Variables reactivas para almacenar el usuario, la contraseña y el mensaje de error
const username = ref('');
const password = ref('');
const errorMessage = ref('');

// Función de login
const login = async () => {
  // Validamos si los campos no están vacíos
  if (!username.value || !password.value) {
    errorMessage.value = 'Por favor, ingresa ambos campos';
    return;
  }

  try {
    // Realizamos la solicitud POST para el login
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      usuario: username.value,
      contrasena: password.value,
    });

    // Si la respuesta es exitosa, guardamos el token en el almacenamiento local
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Redirigimos al panel de usuario o al dashboard
      window.location.href = '/panel'; 
    }
  } catch (error) {
    // Manejamos los errores en caso de credenciales incorrectas
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || 'Error al iniciar sesión';
    } else {
      errorMessage.value = 'Hubo un problema con la conexión';
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.user,
.password {
  width: 100%;
  margin-bottom: 1rem;
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
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: rgb(10, 149, 255);
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: rgb(42, 124, 186);
}

.error {
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
}

/* Aumentar el tamaño de los campos para pantallas que no sean celulares */
@media (min-width: 769px) {
  .login-container {
    max-width: 900px; /* Hacemos más largo el contenedor */
  }

  input {
    padding: 1rem;
    font-size: 1.1rem;
  }

  .login-button {
    padding: 1rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
  }

  input {
    padding: 0.5rem;
  }

  .login-button {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
  }

  input {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .login-button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
