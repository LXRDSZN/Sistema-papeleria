<script setup>
import { ref } from 'vue'; // Variables reactivas
import axios from 'axios'; // Solicitudes HTTP
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Variables reactivas para los campos del formulario
const Codigo_barras = ref('');
const Nombre_producto = ref('');
const Cantidad_producto = ref('');
const Precio_compra = ref('');
const precio_venta = ref('');
const selectedCategory = ref(''); // Almacena la categoría seleccionada

const toast = useToast();

// Lista estática de categorías
const categories = ref([
  { id: 1, nombre: 'Hojas blancas' },
  { id: 2, nombre: 'Cuadernos' },
  { id: 3, nombre: 'Lápices' },
  { id: 4, nombre: 'Bolígrafos' },
  { id: 5, nombre: 'Gomas' },
  { id: 6, nombre: 'Sacapuntas' },
  { id: 7, nombre: 'Correctores' },
]);

// Función para dar de alta un producto
const resgistrerproducto = async () => {
  if (
    !Codigo_barras.value ||
    !Nombre_producto.value ||
    !Cantidad_producto.value ||
    !Precio_compra.value ||
    !precio_venta.value ||
    !selectedCategory.value
  ) {
    toast.error('Por favor, completa todos los campos del formulario.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    // Realizamos la solicitud POST al backend
    const response = await axios.post('http://localhost:5000/api/auth/altaproducto', {
      Codigo_barras: Codigo_barras.value,
      Nombre_producto: Nombre_producto.value,
      Cantidad_producto: Cantidad_producto.value,
      Precio_compra: Precio_compra.value,
      precio_venta: precio_venta.value,
      categoria: selectedCategory.value, // Enviar la categoría seleccionada
    });

    // Verifica la respuesta del servidor
    if (response.data.message === 'Producto registrado exitosamente') {
      toast.success('Producto registrado exitosamente. Redirigiendo...', {
        position: 'top-right',
        duration: 2000, // Duración de la animación de éxito
        dismissible: true,
      });

      // Redirigir con un pequeño retraso para mostrar el mensaje
      setTimeout(() => {
        window.location.href = `/Panel`; // Redirigir a la página del panel
      }, 750); // Retraso antes de redirigir
    } else {
      toast.error('Error en el registro. Intente nuevamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    }
  } catch (error) {
    console.error('Error al registrar:', error);
    toast.error('Hubo un problema con el servidor. Intenta nuevamente.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
  }
};
</script>

<template>
  <div class="sys-Alta-producto">
    <div class="panel-Alta">
      <h3>Alta de Productos</h3>

      <!-- Campos de formulario -->

      <div class="form-group">
        <label for="Codigo_barras">Código de Barras</label>
        <input
          type="text"
          id="Codigo_barras"
          placeholder="Ingrese el código de barras"
          v-model="Codigo_barras"
        />
      </div>

      <div class="form-group">
        <label for="Categoria">Categoría</label>
        <select id="Categoria" v-model="selectedCategory">
          <option value="">Seleccione la categoría</option>
          <option v-for="category in categories" :key="category.id" :value="category.nombre">
            {{ category.nombre }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="Nombre_producto">Nombre</label>
        <input
          type="text"
          id="Nombre_producto"
          placeholder="Ingrese el nombre del producto"
          v-model="Nombre_producto"
        />
      </div>

      <div class="form-group">
        <label for="Cantidad_producto">Cantidad</label>
        <input
          type="number"
          id="Cantidad_producto"
          placeholder="Ingrese la cantidad del producto"
          v-model="Cantidad_producto"
        />
      </div>

      <div class="form-group">
        <label for="Precio_compra">Precio de Compra</label>
        <input
          type="text"
          id="Precio_compra"
          placeholder="Ingrese el precio de compra"
          v-model="Precio_compra"
        />
      </div>

      <div class="form-group">
        <label for="precio_venta">Precio de Venta</label>
        <input
          type="text"
          id="precio_venta"
          placeholder="Ingrese el precio de venta"
          v-model="precio_venta"
        />
      </div>

      <button class="save-button" @click="resgistrerproducto">Guardar</button>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal del panel */
.sys-Alta-producto {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto;
  margin-left: 250px;
  padding: 2rem;
}

/* Estilo del panel de alta de productos */
.panel-Alta {
  display: block;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 70%;
}

h3 {
  color: #003366; /* Tono azul similar al de la barra de navegación */
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 1rem;
  color: #333;
}

input[type="text"],
input[type="number"],
select {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.save-button {
  display: block;
  margin: 0 auto;
  width: 30%;
  padding: 0.8rem 2rem;
  background-color: #003366; /* Azul oscuro para el botón */
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.save-button:hover {
  background-color: #00509e; /* Color más claro al pasar el ratón */
}
</style>
