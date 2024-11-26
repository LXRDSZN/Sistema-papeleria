<template>
  <div
    class="statistic-box"
    :style="{ backgroundColor: isHovered ? hoverColor : color }"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="navigateTo"
  >
    <i :class="`icon-${icon}`"></i>
    <div class="details">
      <h3>{{ count }}</h3>
      <p>{{ label }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';

// Definición de propiedades
const props = defineProps({
  icon: String, // Clase del ícono
  label: String, // Etiqueta de la caja (Clientes, Categorías, etc.)
  count: [String, Number], // Valor numérico
  color: String, // Color base
  hoverColor: String, // Color al pasar el cursor
  
});

// Control del hover
const isHovered = ref(false);

// Navegación
const router = useRouter();
const navigateTo = (path) => {
  if (path) {
    router.push('/Consulta_Usuarios'); // Redirigir al panel
  }
};
</script>

<style scoped>
.statistic-box {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  color: white;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s; /* Animación suave */
}
.statistic-box:hover {
  transform: scale(1.05); /* Efecto de agrandamiento */
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
