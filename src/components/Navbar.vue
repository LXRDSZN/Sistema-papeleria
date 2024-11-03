<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute();
</script>

<template>
    <nav class="navbar">
        <h1>El Angel - Panel</h1>
        <ul>
            <li><RouterLink to="/panel">Panel de control</RouterLink></li>
            <li><RouterLink to="/Alta Producto">Alta de productos</RouterLink></li>
            <li><RouterLink to="/Baja Producto">Baja de productos</RouterLink></li>
            <li><RouterLink to="/Conslta">Buscar productos</RouterLink></li>
        </ul>
    </nav>
    <RouterView />
</template>


<style scoped>
.navbar {
    background-color: #2d3e50;
    color: #fff;
    padding: 1rem;
    width: 250px; 
    height: 100vh; 
    position: fixed; 
    top: 0;
    left: 0; 
}

h1 {
    margin-bottom: 1rem; 
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    margin: 0.5rem 0; 
}

a {
    color: #fff;
    text-decoration: none;
    display: block; 
    padding: 0.5rem;
}

a:hover {
    background-color: rgba(255, 255, 255, 0.1); 
}
</style>
