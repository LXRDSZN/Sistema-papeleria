<template>
    <div class="data-table">
        <h2>{{ title }}</h2>
        <table>
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <td v-for="value in Object.values(item)" :key="value">{{ value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    title: String,
    data: Array
});

const headers = computed(() => {
    if (props.data.length) return Object.keys(props.data[0]);
    return [];
});
</script>

<style scoped>
.data-table {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1rem;
}
table {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    padding: 0.5rem;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
}
</style>
