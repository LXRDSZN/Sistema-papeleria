import client from './db.js';  // Importa el cliente de base de datos

// Función para registrar un nuevo usuario
export const registerUser = async (curp, apellido_paterno, apellido_materno, nombre, correo, telefono, usuario, contrasena, rol_id) => {
  // Query para insertar el nuevo usuario en la base de datos
  const query = `
    INSERT INTO usuarios 
    (curp, apellido_paterno, apellido_materno, nombre, correo, telefono, usuario, contrasena, rol_id, fecha_creacion)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
    RETURNING *;
  `;

  try {
    // Ejecuta la consulta con los datos del nuevo usuario
    const res = await client.query(query, [curp, apellido_paterno, apellido_materno, nombre, correo, telefono, usuario, contrasena, rol_id]);

    // Devuelve los datos del usuario recién registrado
    return res.rows[0];  // Devuelve la fila insertada
  } catch (error) {
    console.error('Error al registrar el  usuario:', error);
    throw error;  // Lanza el error para que se maneje en el controlador
  }
};
