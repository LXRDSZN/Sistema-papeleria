<script setup>


</script>

<template>
  <div class="sistema-panel-usuario">
    <div class="panel-usuario">
    
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal del panel */
.sistema-panel-usuario {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto;
  margin-left: 250px;
  padding: 1rem;
}

/* Panel de contenido */
.panel-usuario {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-height: 100%;
}

</style>