<template>
    <div class="recent-products">
        <h2>Productos Recientemente Añadidos</h2>
        <ul>
            <li v-for="(product, index) in products" :key="index">
                <span>{{ product.title }}</span>
                <span>{{ product.price }}</span>
                <span class="category">{{ product.category }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    products: Array
});
</script>

<style scoped>
.recent-products {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1rem;
    color: #000000;
}
ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e0e0e0;
}
.category {
    font-style: italic;
    color: #000000;
}
</style>
