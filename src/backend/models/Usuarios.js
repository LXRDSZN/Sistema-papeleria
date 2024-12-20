import client from './db.js'; // Importa el cliente de conexión a la base de datos

// Función para consultar usuarios
export const consultausuarios = async () => {
  try {
    // Consulta para obtener los usuarios
    const result = await client.query(
      'SELECT curp, usuario, nombre, apellido_paterno, apellido_materno, rol_id FROM usuarios'
    );

    // Retorna los datos como un arreglo
    return result.rows;
  } catch (error) {
    console.error('Error al consultar los usuarios:', error);
    throw new Error('Error al consultar los usuarios.');
  }
};
