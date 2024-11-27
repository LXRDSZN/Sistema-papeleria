
import client from "./db.js";

export const registrarVenta = async (producto_id, cantidad, precio_total) => {
  const query = `
    INSERT INTO ventas 
    (producto_id, cantidad, precio_total, fecha_venta)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;

  try {
    // Ejecuta la consulta con los parámetros proporcionados
    const res = await client.query(query, [producto_id, cantidad, precio_total]);
    return { success: true, data: res.rows[0] }; // Retorna los datos insertados
  } catch (error) {
    console.error('Error al registrar la venta:', error);  // Muestra el error en consola
    return { success: false, message: 'Error al registrar la venta', error: error.message }; // Detalles del error
  }
};
