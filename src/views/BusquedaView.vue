<script setup>
import Navbar from '@/components/Navbar.vue';
import ComponentBusquedaProducto from '@/components/Component-busqueda-producto.vue';

</script>
<template>
    <div class="Busqueda">
        <ComponentBusquedaProducto/>
        <Navbar/>
    </div>
  </template>
  
  <style>
  .Busqueda{
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 0px);
    height: 100vh;
    overflow-y: auto; /* Permite el desplazamiento solo vertical */
    padding: 1rem;
  }
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  