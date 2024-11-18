// src/backend/models/user.js
import client from './db.js';  //impotamos clientes de la base de datos

// Función para obtener todos los usuarios de la base de datos
export const getUsers = async () => {
  const query = 'SELECT * FROM usuarios';  // Consulta a la base de datos 
  try {
    const res = await client.query(query);  // Ejecuta la consulta
    return res.rows;  // Devuelve los resultados como un array de usuarios
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;  // Lanza el error para que se maneje en el controlador
  }
};

// Función para verificar las credenciales del usuario
export const checkUserCredentials = async (username, password) => {
  const query = 'SELECT * FROM usuarios WHERE usuario = $1 AND contrasena = $2';  // consuta  con filtros a usuario y contrasena
  try {
    const res = await client.query(query, [username, password]);

    if (res.rows.length > 0) {
      return res.rows[0]; // devuelve los datos del usuario
    } else {
      return null;  // Si no se encuentra el usuario o las credenciales son incorrectas
    }
  } catch (error) {
    console.error('Error al verificar las credenciales:', error);
    throw error;
  }
};
