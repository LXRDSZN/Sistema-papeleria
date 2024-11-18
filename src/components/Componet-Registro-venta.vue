<script setup>
import DataTable from './complements/DataTable.vue';

const datosDeCompra = [
    { CB: 1, nombre: 'kike', Cantidad: '1', PrecioU: '$50.00', PrecioS: '$20-00', fecha: '14/11/2024', Usuario: 'kike'},
    { CB: 2, nombre: 'andres', Cantidad: '2', PrecioU: '$20.00', PrecioS: '$20-00', fecha: '14/11/2024', Usuario: 'kike'},
    { CB: 3, nombre: 'cesar', Cantidad: '3', PrecioU: '$15.00', PrecioS: '$20-00', fecha: '14/11/2024', Usuario: 'kie'}
  ]

</script>

<template>
  <div class="sistema-panel-venta">
    <div class="panel-venta">
      <h3>Venta de Productos</h3>

      <!-- Formulario de ingreso -->
      <div class="formulario-datos-usuario">
        <div class="formulario-datos">
          <label>CD</label>
          <input type="text" placeholder="Ingrese el código de barras" />
        </div>
        <div class="formulario-datos">
          <label>Cantidad</label>
          <input type="number" placeholder="Ingrese la cantidad del producto" />
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="botones-accion">
        <button class="boton-guardar">Guardar</button>
        <button class="boton-eliminar">Eliminar Fila</button>
      </div>

      <!-- Tabla de productos -->
      <div class="tabla-venta">
        <DataTable title="Tabla de Venta" :data="datosDeCompra" />

      </div>
      <div class="formulario-datos-usuario">

        <div class="formulario-datos">
          <label>Total de Venta</label>
          <p class="precio"> $500 </p>
        </div>
        <!-- Generar reporte -->
        <div class="formulario-datos">
          <p>Generar Reporte</p>
          <select>
            <option>Seleccione la forma</option>
          </select>
        </div>
      </div>

      <button class="boton-generar-reporte">General</button>

    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal del panel */
.sistema-panel-venta {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto;
  margin-left: 250px;
  padding: 1rem;
}

/* Panel de contenido */
.panel-venta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-height: 100%;
}

/* Título del panel */
h3 {
  color: #003366;
  font-size: 2.5rem;
  margin-bottom: .2rem;
}

/* Contenedor del formulario */
.formulario-datos-usuario {
  display: flex;
  gap: 1rem;
}

/* Contenedor de cada campo */
.formulario-datos {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

label, p {
  font-size: 1.5rem;
  color: #333;
}

.precio {
  border-bottom: 2px solid black; 
  color: green; 
  text-align: left;
  width: 25%;
}

input[type="text"], input[type="number"], select {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

/* Botones de acción */
.botones-accion {
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;

}

.boton-guardar, .boton-eliminar {
  width: 20%;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #fff;
}

.boton-guardar {
  background-color: #003366;
}

.boton-eliminar {
  background-color: #cc0000;
}

/* Tabla */
.tabla-venta {
  color: #000000;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Generar reporte */
.generar-reporte {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.boton-generar-reporte {
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

.boton-generar-reporte:hover {
  background-color: #003366;
}
</style>