import client from './db.js'; // Cliente de la base de datos

/**
 * Elimina o actualiza un producto en la base de datos según los datos proporcionados.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
export const eliminarProducto = async (req, res) => {
  const { formaEliminacion, cantidadMerma, datoSeleccionado } = req.body;

  try {
    // Validación de campos
    if (!formaEliminacion || !datoSeleccionado) {
      return res.status(400).json({ message: 'Forma de eliminación y dato seleccionado son obligatorios.' });
    }

    // Construcción de la consulta
    let query;
    const values = [datoSeleccionado];

    if (cantidadMerma) {
      // Actualización de la cantidad (merma)
      query = `UPDATE productos SET cantidad = cantidad - $2 WHERE ${
        formaEliminacion === 'Codigo de Barras' ? 'codigo_barras' : 'nombre'
      } = $1 AND cantidad >= $2`;
      values.push(cantidadMerma);
    } else {
      // Eliminación completa
      query = `DELETE FROM productos WHERE ${
        formaEliminacion === 'Codigo de Barras' ? 'codigo_barras' : 'nombre'
      } = $1`;
    }

    // Ejecución de la consulta
    const result = await client.query(query, values);

    // Verificar si se afectaron filas
    if (result.rowCount > 0) {
      res.status(200).json({ message: cantidadMerma ? 'Producto actualizado exitosamente' : 'Producto eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'No se encontró el producto con los datos proporcionados.' });
    }
  } catch (error) {
    console.error('Error al eliminar o actualizar producto:', error);
    res.status(500).json({ message: 'Error del servidor. Intente nuevamente.' });
  }
};
