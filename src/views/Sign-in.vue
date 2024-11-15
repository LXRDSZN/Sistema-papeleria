<script setup>
import Navbar from '@/components/Navbar.vue';
import Usuario from '../components/Component-Usuario.vue';
</script>
<template>
    <div class="sign-in">
  
      <Usuario/>
     <Navbar/>
    </div>
  </template>
  
  <style>
  .registros {
    width: 100%;
    font-size: 20px;
    text-align: center;
    margin-top: 2rem;
  }
  
  .registros a.router-link-exact-active {
    color: rgb(91, 96, 91);
  }
  
  .registros a.router-link-exact-active:hover {
    background-color: transparent;
  }
  
  .registros a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }
  
  .registros a:first-of-type {
    border: 0;
  }
  
  .sign-in{
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
  