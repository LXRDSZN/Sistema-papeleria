<script setup>

</script>

<template>
  <div class="sys-Alta-producto">
    <div class="panel-Alta ">
        <h3>
            Altas de productos
        </h3>
    </div>
  
  </div>
</template>


<style scoped>
/* Contenedor principal del panel, para que ocupe toda la pantalla */
.sys-Alta-producto {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto; /* Permite el desplazamiento solo vertical */
  margin-left: 250px; 
  padding: 1rem;
}

/* Panel de contenido */
.panel-Alta {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-height: 100%; 
}

</style>
