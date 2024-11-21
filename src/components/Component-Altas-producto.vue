<script setup>
import { ref } from 'vue'; // Variables reactivas
import axios from 'axios'; // Solicitudes HTTP
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Variables reactivas para los campos del formulario
const codigo_barras = ref('');
const categoria = ref('');
const nombre = ref('');
const cantidad = ref('');
const precio_compra = ref('');
const precio_venta = ref('');

const toast = useToast();

// Lista de categorías disponibles
const categories = ref([
  { id: 1, name: 'Hojas blancas' },
  { id: 2, name: 'Cuadernos' },
  { id: 3, name: 'Lápices' },
  { id: 4, name: 'Bolígrafos' },
  { id: 5, name: 'Gomas' },
  { id: 6, name: 'Sacapuntas' },
  { id: 7, name: 'Correctores' },
]);

// Función para dar de alta un producto
const registrarProducto = async () => {
  // Validar que los campos requeridos no estén vacíos
  if (
    !codigo_barras.value ||
    !categoria.value ||
    !nombre.value ||
    !cantidad.value ||
    !precio_compra.value ||
    !precio_venta.value
  ) {
    toast.error('Por favor, completa todos los campos del formulario.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  // Validar que cantidad, precio_compra y precio_venta sean válidos
  if (cantidad.value < 0 || precio_compra.value <= 0 || precio_venta.value <= 0) {
    toast.error('Cantidad y precios deben ser valores positivos.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    // Realizar la solicitud POST al backend
    const response = await axios.post('http://localhost:5000/api/auth/altaproducto', {
      codigo_barras: codigo_barras.value,
      categoria: categoria.value,
      nombre: nombre.value,
      cantidad: parseInt(cantidad.value, 10),
      precio_compra: parseFloat(precio_compra.value).toFixed(2),
      precio_venta: parseFloat(precio_venta.value).toFixed(2),
    });

    // Verificar la respuesta del servidor
    if (response.data.message === 'Producto registrado exitosamente') {
      toast.success('Producto registrado exitosamente. Redirigiendo...', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });

      // Redirigir después de un pequeño retraso
      setTimeout(() => {
        window.location.href = `/Panel`; // Redirigir a la página del panel
      }, 750);
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

      <!-- Formulario -->
      <div class="form-group">
        <label for="codigo_barras">Código de Barras</label>
        <input
          type="text"
          id="codigo_barras"
          placeholder="Ingrese el código de barras"
          v-model="codigo_barras"
        />
      </div>

      <div class="form-group">
        <label for="categoria">Categoría</label>
        <select id="categoria" v-model="categoria">
          <option value="">Seleccione la categoría</option>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          placeholder="Ingrese el nombre del producto"
          v-model="nombre"
        />
      </div>

      <div class="form-group">
        <label for="cantidad">Cantidad</label>
        <input
          type="number"
          id="cantidad"
          placeholder="Ingrese la cantidad del producto"
          v-model="cantidad"
        />
      </div>

      <div class="form-group">
        <label for="precio_compra">Precio de Compra</label>
        <input
          type="number"
          step="0.01"
          id="precio_compra"
          placeholder="Ingrese el precio de compra"
          v-model="precio_compra"
        />
      </div>

      <div class="form-group">
        <label for="precio_venta">Precio de Venta</label>
        <input
          type="number"
          step="0.01"
          id="precio_venta"
          placeholder="Ingrese el precio de venta"
          v-model="precio_venta"
        />
      </div>

      <button class="save-button" @click="registrarProducto">Guardar</button>
    </div>
  </div>
</template>

<style scoped>
/* Estilo igual que el anterior */
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

.panel-Alta {
  display: block;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 70%;
}

h3 {
  color: #003366;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  background-color: #003366;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.save-button:hover {
  background-color: #00509e;
}
</style>
