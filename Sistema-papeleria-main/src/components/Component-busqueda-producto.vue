<script setup>
import DataTable from './complements/DataTable.vue';

const datosDeCompra = [
    { CB: 1, Nombre: 'kike', Marca: 'chantillin', Stock: '$50.00', PrecioV: '$20-00', PrecioC: '$4'},
    { CB: 2, Nombre: 'andres', Marca: 'chantillin', Stock: '$20.00', PrecioV: '$20-00', PrecioC: '$4'},
    { CB: 3, Nombre: 'cesar', Marca: 'chantillin', Stock: '$15.00', PrecioV: '$20-00', PrecioC: '$4'}
  ]
</script>

<template>
    <div class="sys-panel-busqueda">
      <div class="panel-busqueda">
        <h3>Busqueda de Producto</h3>  

        <!--campo de trabajo-->
        <div class="selecciones">

          <div class="datos-usuario">
            <label>Forma de Busqueda</label>
            <select>
              <option>Seleccione la forma</option>
              <option>CD</option>
              <option>Nombre</option>
            </select>
          </div>

          <div class="datos-usuario">
            <label>Categoria</label>
            <select>
              <option>Seleccione la Categoria</option>
              <option>kikelgbt</option>
              <option>kikecolor</option>
            </select>
          </div>
          
        </div>

        <div class="dato-seleccionado">
          <label>Dato Seleccionado</label>
          <input type="text" placeholder="Ingrese el dato correspondinte de la forma seleccionada" />
        </div>

        <!-- Tabla de productos -->
        <div class="tabla-busqueda">
          <DataTable title="Tabla de Busqueda" :data="datosDeCompra" />
        </div>

        <button class="boton-eliminar-busqueda">Eliminar</button>
      </div>
    </div>
</template>

<style scoped>
/* Contenedor principal del panel, para que ocupe toda la pantalla */
.sys-panel-busqueda {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto; /* Permite el desplazamiento solo vertical */
  margin-left: 250px; 
  padding: 2rem;
}

/* Panel de contenido */
.panel-busqueda {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-height: 100%; 
}

/* Título del panel */
h3 {
  color: #003366;
  font-size: 2.5rem;
  margin-bottom: .2rem;
}

.selecciones {
  display: flex;
  gap: 1rem;
}

.datos-usuario {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

label{
  font-size: 1.5rem;
  color: #333;
}

input[type="text"], select {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.dato-seleccionado {
  display: flex;
  flex-direction: column;
  width: 50%;
}

/* Tabla */
.tabla-busqueda {
  color: #000000;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.boton-eliminar-busqueda {
  display: block;
  margin: 0 auto;
  width: 20%;
  padding: 0.8rem 1.5rem;
  background-color: #00509e;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.boton-eliminar:hover {
  background-color: #003366;
}
</style>
