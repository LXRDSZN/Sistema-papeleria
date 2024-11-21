import client from './db.js';  // Importa el cliente de base de datos

// Función para registrar un nuevo usuario
export const resgistrerproducto = async (codigo_barras, categoria, nombre, cantidad, precio_compra, precio_venta) => {
  // Query para insertar el nuevo usuario en la base de datos
  const query = `
    INSERT INTO productos 
    (codigo_barras, categoria, nombre, cantidad, precio_compra, precio_venta)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  try {
    // Ejecuta la consulta con los datos del nuevo usuario
    const res = await client.query(query, [codigo_barras, categoria, nombre, cantidad, precio_compra, precio_venta]);

    // Devuelve los datos del usuario recién registrado
    return res.rows[0];  // Devuelve la fila insertada
  } catch (error) {
    console.error('Error al registrar el  Producto:', error);
    throw error;  // Lanza el error para que se maneje en el controlador
  }
};
