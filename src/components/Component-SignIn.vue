<script setup>
import { ref } from 'vue';

const curp = ref('');
const apellido_paterno = ref('');
const apellido_materno = ref('');
const nombre = ref('');
const correo = ref('');
const telefono = ref('');
const username = ref('');
const password = ref('');
</script>

<template>
  <div class="register-container">
    <section class="field">
      <label for="curp">CURP:</label>
      <input type="text" id="curp" v-model="curp" placeholder="Ingrese su CURP" />
    </section>

    <section class="field">
      <label for="apellido_paterno">Apellido Paterno:</label>
      <input type="text" id="apellido_paterno" v-model="apellido_paterno" placeholder="Ingrese su Apellido Paterno" />
    </section>

    <section class="field">
      <label for="apellido_materno">Apellido Materno:</label>
      <input type="text" id="apellido_materno" v-model="apellido_materno" placeholder="Ingrese su Apellido Materno" />
    </section>

    <section class="field">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" v-model="nombre" placeholder="Ingrese su Nombre" />
    </section>

    <section class="field">
      <label for="correo">Correo:</label>
      <input type="email" id="correo" v-model="correo" placeholder="Ingrese su Correo" />
    </section>

    <section class="field">
      <label for="telefono">Teléfono:</label>
      <input type="tel" id="telefono" v-model="telefono" placeholder="Ingrese su Teléfono" />
    </section>

    <section class="field">
      <label for="username">Usuario:</label>
      <input type="text" id="username" v-model="username" placeholder="Ingrese su Usuario" />
    </section>

    <section class="field">
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" placeholder="Ingrese su Contraseña" />
    </section>

    <button class="register-button">Registrar</button>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.field {
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

.register-button {
  width: 100%;
  padding: 0.75rem;
  background-color: rgb(10, 149, 255);
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: rgb(42, 124, 186);
}
</style>
