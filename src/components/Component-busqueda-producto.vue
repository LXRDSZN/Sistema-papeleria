<script setup>

</script>

<template>
    <div class="sys-panel-busqueda">
      <div class="panel-busqueda">
      <h3>busqueda de producto</h3>  
      </div>
    </div>
</template>

<style scoped>
/* Contenedor principal del panel, para que ocupe toda la pantalla */
.sys-panel-busqueda {
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
.panel-busqueda {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-height: 100%; 
}



/* Media query para pantallas pequeñas */
@media (max-width: 1200px) {
  .statistics {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  }
}

@media (max-width: 768px) {
  .statistics {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  }
}

@media (max-width: 480px) {
  .statistics {
    grid-template-columns: 1fr; /* 1 columna */
  }
}
</style>
