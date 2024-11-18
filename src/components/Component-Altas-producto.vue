<script setup>
</script>

<template>
  <div class="sys-Alta-producto">
    <div class="panel-Alta ">
      <h3>Alta de Productos</h3>

      <!-- Campos de formulario -->

      <div class="form-group">
        <label>CD</label>
        <input type="text" placeholder="Ingrese el código de barras" />
      </div>

      <div class="form-group">
        <label>Categoría</label>
        <select>
          <option>Seleccione la categoría</option>
          <option>Gomas</option>
        </select>
      </div>

      <div class="form-group">
        <label>Nombre</label>
        <input type="text" placeholder="Ingrese el nombre del producto" />
      </div>

      <div class="form-group">
        <label>Cantidad</label>
        <input type="number" placeholder="Ingrese la cantidad del producto" />
      </div>

      <div class="form-group">
        <label>Precio de Compra</label>
        <input type="text" placeholder="Ingrese el precio de compra" />
      </div>

      <div class="form-group">
        <label>Precio Venta</label>
        <input type="text" placeholder="Ingrese el precio de venta" />
      </div>
      
      <button class="save-button">Guardar</button>

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