<script setup>

</script>

<template>
  <div class="sys-baja-producto">
    <div class="panel-baja">
      <h3>Bajas de productos</h3>

      <!--campo de trabajo-->

      <div class="datos-generales">

        <div class="datos-usuario">
          <label>Forma de Eliminar</label>
          <select>
            <option>Seleccione la forma</option>
            <option>CD</option>
            <option>Nombre</option>
          </select>
        </div>
        
        <div class="datos-usuario">
          <label >Cantidad (Merma)</label>
          <input type="number" placeholder="Ingrese la cantidad del producto" />
        </div>
      </div>

      <div class="dato-seleccionado">
        <label>Dato Seleccionado</label>
        <input type="text" placeholder="Ingrese el dato correspondinte de la forma seleccionada" />
      </div>
      
      <button class="boton-eliminar-producto">Eliminar</button>
    </div>
  
  </div>
</template>


<style scoped>
/* Contenedor principal del panel, para que ocupe toda la pantalla */
.sys-baja-producto {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto;
  margin-left: 250px;
  padding: 2rem;

}

/* Panel de contenido */
.panel-baja {
  display: block;
  margin: 100px auto;
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

.datos-generales{
  display: flex;
  gap: 1rem;
}

.datos-usuario {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

.dato-seleccionado {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 55%;
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

.boton-eliminar-producto {
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