<template>
    <div class="dashboard">
        <!-- Statistics Section -->
        <div class="statistics">
            <StatisticBox icon="users" label="Clientes" count="50" color="#4CAF50" />
            <StatisticBox icon="tags" label="Categorías" count="12" color="#FF5722" />
            <StatisticBox icon="box" label="Productos en Inventario" count="300" color="#03A9F4" />
            <StatisticBox icon="shopping-bag" label="Ventas Mensuales" count="120" color="#FFC107" />
        </div>

        <!-- Tables Section -->
        <div class="tables">
            <DataTable title="Productos Más Vendidos" :data="bestSellingProducts" />
            <DataTable title="Últimas Ventas" :data="recentSales" />
        </div>

        <!-- Recent Products Section -->
        <RecentProducts :products="recentlyAddedProducts" />
    </div>
</template>

<script setup>
import StatisticBox from '@/components/StatisticBox.vue';
import DataTable from '@/components/DataTable.vue';
import RecentProducts from '@/components/RecentProducts.vue';

// Mock data for now (will be fetched from backend in the future)
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

const recentlyAddedProducts = [
    { title: 'Goma de Borrar', price: '$5.00', category: 'Accesorios' },
    { title: 'Tijeras', price: '$15.00', category: 'Material de Corte' },
    { title: 'Pegamento en Barra', price: '$10.00', category: 'Adhesivos' }
];
</script>

<style scoped>
.dashboard {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
}
.statistics {
    display: flex;
    gap: 1rem;
}
.tables {
    display: flex;
    gap: 1rem;
}
</style>
