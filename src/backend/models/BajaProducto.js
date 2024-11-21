import client from './db.js'; // Importa el cliente de conexión a la base de datos


export const eliminarProducto = async (formaEliminacion, datoSeleccionado) => {
  try {
    // Verifica que ambos parámetros estén presentes
    if (!formaEliminacion || !datoSeleccionado) {
      return { success: false, message: "Debes proporcionar ambos parámetros: forma de eliminación y dato seleccionado." };
    }

    // Consulta SQL dependiendo de la forma de eliminación
    let query = '';
    const values = [];

    // Si la forma de eliminación es por Código de Barras
    if (formaEliminacion === 'Codigo de Barras') {
      query = "DELETE FROM productos WHERE codigo_barras = $1";
      values.push(datoSeleccionado); // El código de barras
    } 
    // Si la forma de eliminación es por Nombre
    else if (formaEliminacion === 'Nombre') {
      query = "DELETE FROM productos WHERE nombre = $1";
      values.push(datoSeleccionado); // El nombre del producto
    } 
    else {
      return { success: false, message: "Forma de eliminación no válida. Debe ser 'Codigo de Barras' o 'Nombre'." };
    }

    // Ejecuta la consulta en la base de datos
    const result = await client.query(query, values);

    // Verifica si se eliminó algún producto
    if (result.rowCount > 0) {
      return { success: true, message: "Producto eliminado exitosamente" };
    } else {
      return { success: false, message: "No se encontró el producto con los datos proporcionados." };
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return { success: false, message: "Error al eliminar producto. Intente nuevamente." };
  }
};
