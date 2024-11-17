<script setup>
import Navbar from '@/components/Navbar.vue';
import ComponetRegistroVenta from '@/components/Componet-Registro-venta.vue';

</script>

<template>
    <div class="Registro-venta">
        
        <Navbar/>
        <ComponetRegistroVenta/>
    </div>
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  