import client from './db.js'; // Importa el cliente de conexión a la base de datos

export const ConsultaProductofiltro = async (tipoBusqueda, datoBusqueda) => {
  try {
    // Verificamos el tipo de búsqueda y ejecutamos la consulta correspondiente
    let query = '';
    let params = [];

    if (tipoBusqueda === 'Codigo de Barras') {
      query = 'SELECT * FROM productos WHERE codigo_barras = $1';
      params = [datoBusqueda];
    } else if (tipoBusqueda === 'Nombre') {
      query = 'SELECT * FROM productos WHERE nombre ILIKE $1'; // Usamos ILIKE para búsqueda no sensible a mayúsculas/minúsculas
      params = [`%${datoBusqueda}%`];
    } else {
      throw new Error('Tipo de búsqueda no válido');
    }

    // Ejecutamos la consulta con los parámetros correctos
    const result = await client.query(query, params);
    return result.rows; // Retorna los resultados encontrados
  } catch (error) {
    // Muestra el error si la consulta falla
    console.error('Error al consultar los productos:', error);
    throw new Error('Error al realizar la búsqueda');
  }
};
