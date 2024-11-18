import client from './db.js';  // Importa el cliente de base de datos

// Función para registrar una nueva dirección
export const registerAddress3 = async (curp, calle, numero_exterior, numero_interior, colonia, ciudad, estado, codigo_postal,pais) => {
  // Query para insertar una nueva dirección en la base de datos
  const query = `
  INSERT INTO direcciones 
  (curp, calle, numero_exterior, numero_interior, colonia, ciudad, estado, codigo_postal,pais)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *;
`;
  try {
    // Ejecuta la consulta con los datos de la dirección
    const res = await client.query(query, [curp, calle, numero_exterior, numero_interior, colonia, ciudad, estado, codigo_postal,pais]);

    // Devuelve los datos de la dirección recién registrada
    return res.rows[0];  // Devuelve la fila insertada
  } catch (error) {
    console.error('Error al registrar la dirección:', error);
    throw error;  // Lanza el error para que se maneje en el controlador
  }
};
