<script setup>
import Navbar from '@/components/Navbar.vue';
import ComponentBajaUser from '@/components/Component-baja-User.vue';

</script>
<template>
    <div class="Drop_user">
    <Navbar/>
    <ComponentBajaUser/>
    </div>
  </template>
  
  <style>
  .Drop_user{
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 0px);
    height: 100vh;
    overflow-y: auto; 
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
  