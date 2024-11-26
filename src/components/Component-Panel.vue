<script setup>
import StatisticBox from './complements/StatisticBox.vue';


// Datos de ejemplo (en el futuro se obtendrán del backend)
const bestSellingProducts = [
    { title: 'Cuaderno A4', sold: 20, stock: 100 },
    { title: 'Bolígrafo Azul', sold: 15, stock: 200 },
    { title: 'Carpeta Plástica', sold: 10, stock: 50 }
];

const recentSales = [
    { id: 1, product: 'Cuaderno A4', date: '2024-11-05', total: '$50.00' },
    { id: 2, product: 'Marcador Permanente', date: '2024-11-04', total: '$20.00' },
    { id: 3, product: 'Libreta Escolar', date: '2024-11-03', total: '$15.00' }
];


</script>

<template>
  <div class="syste-panel">
    <div class="panel">
      <!-- Sección de Estadísticas -->
      <div class="statistics">
        <StatisticBox
          icon="users"
          label="Usuario"
          count="10"
          color="#4CAF50"
          hoverColor="#388E3C" 
        />
        <StatisticBox
          icon="tags"
          label="Categorías"
          count="12"
          color="#FF5722"
          hoverColor="#E64A19"
        />
        <StatisticBox
          icon="box"
          label="Productos en Inventario"
          count="300"
          color="#03A9F4"
          hoverColor="#0288D1"
        />
        <StatisticBox
          icon="shopping-bag"
          label="Ventas Mensuales"
          count="120"
          color="#FFC107"
          hoverColor="#FFA000"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal del panel, para que ocupe toda la pantalla */
.syste-panel {
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
.panel {
  display: flex;
  color: #000000;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-height: 100%;
}

/* Estilo para las estadísticas */
.statistics {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}

.statistics > * {
  min-width: 150px;
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
