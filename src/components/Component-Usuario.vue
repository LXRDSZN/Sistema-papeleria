<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="sys-panel-usuario">
    <nav class="registros">
      <RouterLink to="/Datos de usuario">Registar Usuario</RouterLink>
      <RouterLink to="/Datos de direccion">Registrar Direccion</RouterLink>
    </nav>
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
          <label for="rol">Rol:</label>
          <input type="text" id="rol" v-model="rol" placeholder="Ingrese el Rol" />
        </div>
      </section>
  
      <button class="register-button" @click="">Registrar</button>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </div>
  </div>
  </template>
  
  <style scoped>
  .sys-panel-usuario {
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
  