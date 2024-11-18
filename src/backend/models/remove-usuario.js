import client from './db.js'; // Importa el cliente de conexión a la base de datos

/**
 * Función para eliminar un usuario
 * @param {string} curp - CURP del usuario 
 * @param {string} username - Nombre de usuario 
 * @returns {object} - Resultado de la operación
 */
export const eliminarUsuario = async (curp, username) => {
  try {
    // Verifica que al menos uno de los parámetros esté presente
    if (!curp && !username) {
      return { success: false, message: "Debes proporcionar CURP o nombre de usuario para eliminar." };
    }

    // Construimos la consulta SQL con base en los datos proporcionados
    let query = "DELETE FROM usuarios WHERE ";
    const values = [];

    if (curp) {
      query += "curp = $1";
      values.push(curp);
    }

    if (username) {
      if (curp) query += " OR "; // Si ambos están presentes, usamos "OR"
      query += "usuario = $2";
      values.push(username);
    }

    // Ejecuta la consulta en la base de datos
    const result = await client.query(query, values);

    // Verifica si se eliminó algún registro
    if (result.rowCount > 0) {
      return { success: true, message: "Usuario borrado exitosamente" };
    } else {
      return { success: false, message: "No se encontró el usuario con los datos proporcionados." };
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return { success: false, message: "Error al eliminar usuario. Intente nuevamente." };
  }
};
