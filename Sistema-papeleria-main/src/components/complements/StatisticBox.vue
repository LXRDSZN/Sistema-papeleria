<template>
    <div class="statistic-box" :style="{ backgroundColor: color }">
        <i :class="`icon-${icon}`"></i>
        <div class="details">
            <h3>{{ count }}</h3>
            <p>{{ label }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    icon: String,
    label: String,
    count: [String, Number],
    color: String
});
</script>

<style scoped>
.statistic-box {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 8px;
    color: white;
    gap: 1rem;
}
.icon-users, .icon-tags, .icon-box, .icon-shopping-bag {
    font-size: 2rem;
}
.details h3 {
    margin: 0;
    font-size: 1.5rem;
}
.details p {
    margin: 0;
    font-size: 1rem;
}
</style>
