<script setup>
import { ref } from 'vue';

const curp = ref('');
const username = ref('');

const eliminarUsuario = () => {
  console.log("Eliminando usuario con CURP:", curp.value, "o Username:", username.value);
  curp.value = '';
  username.value = '';
};
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

    <button class="delete-button" @click="eliminarUsuario">Eliminar Usuario</button>
  </div>
</template>

<style scoped>
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
