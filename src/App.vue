<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const route = useRoute();

// Función para verificar si estamos en una de las vistas del panel
const isPanelView = () => {
  return route.name === 'Panel del sistema' || 
         route.name === 'Alta Producto' || 
         route.name === 'Baja Producto' || 
         route.name === 'Consulta'; // Asegúrate de que los nombres de las rutas coincidan
};
</script>

<template>
  <header v-if="!isPanelView()">
    <div class="wrapper">
      <HelloWorld msg="Bienvenido Al Sistema!" />

      <nav>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/Registrar">Sign In</RouterLink>
        <RouterLink to="/Panel">Panel del sistema</RouterLink>
      </nav>
    </div>
  </header>

  <main :class="{ 'full-screen': isPanelView() }">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%; 
}

.wrapper {
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 1rem; 
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: rgb(91, 96, 91);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

main {
  width: 100%; 
  padding: 1rem; 
}

.full-screen {
  height: 100vh;
  padding: 0; 
  overflow: hidden; 
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
