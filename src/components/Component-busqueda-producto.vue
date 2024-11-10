<script setup>
import { ref } from 'vue';

// Datos de ejemplo (se actualizarán cuando tengas un backend)
const productCategories = ref([
    {
        category: 'Escritura',
        products: [
            { title: 'Bolígrafo Azul', stock: 200, price: '$2.00' },
            { title: 'Lápiz HB', stock: 100, price: '$1.50' },
        ]
    },
    {
        category: 'Papel',
        products: [
            { title: 'Cuaderno A4', stock: 50, price: '$10.00' },
            { title: 'Hojas Carta', stock: 300, price: '$5.00' },
        ]
    },
    {
        category: 'Material de Corte',
        products: [
            { title: 'Tijeras', stock: 25, price: '$15.00' },
            { title: 'Cúter', stock: 40, price: '$7.00' },
        ]
    },
    // Añade más categorías y productos según sea necesario
]);
</script>

<template>
  <div class="product-category-table">
    <h2>Categorías de Productos</h2>
    <div v-for="category in productCategories" :key="category.category" class="category-section">
      <h3>{{ category.category }}</h3>
      <table class="product-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in category.products" :key="product.title">
            <td>{{ product.title }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.product-category-table {
    padding: 5rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    max-width: 700px;
    margin: 0 auto;
}

h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: rgb(93, 95, 93);
}

.category-section {
    margin-bottom: 2rem;
}

h3 {
    font-size: 1.25rem;
    color: #4CAF50;
    margin-bottom: 0.5rem;
}

.product-table {
    width: 100%;
    border-collapse: collapse;
}

.product-table th,
.product-table td {
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
    text-align: left;
}

.product-table th {
    background-color: #f5f5f5;
    color: rgb(93, 95, 93);
    font-weight: bold;
}

.product-table td {
    color: #333;
}

.product-table tr:hover {
    background-color: #f9f9f9;
}
</style>
