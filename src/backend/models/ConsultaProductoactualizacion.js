import client from "./db.js";

export const actualizarCantidadProducto = async (codigo_barras, cantidad) => {
  try {
    // Asegurarse de que el valor de `cantidad` esté siendo pasado correctamente en la consulta
    const query = `
      UPDATE productos
      SET cantidad = cantidad + $1
      WHERE codigo_barras = $2
    `;

    const values = [cantidad, codigo_barras];

    const result = await client.query(query, values);

    if (result.rowCount > 0) {
      return { success: true };
    } else {
      return { success: false, message: 'Producto no encontrado o no se pudo actualizar la cantidad' };
    }
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto:', error);
    return { success: false, error };
  }
};
