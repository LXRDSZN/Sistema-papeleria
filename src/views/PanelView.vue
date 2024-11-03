<script setup>
import ComponentPanel from '@/components/Component-Panel.vue';
import Navbar from '@/components/Navbar.vue';
</script>
<template>
    <div class="System-Panel">
        <ComponentPanel/>
        <Navbar/>
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
  