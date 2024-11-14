import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  user: 'postgres',            // Usuario proporcionado
  host: 'localhost',           // PostgreSQL local
  database: 'g_systema_papeleria', // Nombre de la base de datos
  password: 'bcb96dbdb1',      // Contraseña proporcionada
  port: 5432,                  // Puerto de PostgreSQL
});

// Conexion a la base de datos
const connectDb = async () => {
  try {
    await client.connect();  
    console.log('Conexión a la base de datos PostgreSQL establecida');

    // Realizar consulta para ver si hay registros en la tabla usuarios
    const query = 'SELECT * FROM usuarios;';
    const res = await client.query(query);

    if (res.rows.length > 0) {
      console.log('Existen registros en la tabla usuarios');
    } else {
      console.log('No hay registros en la tabla usuarios');
    }

  } catch (err) {
    console.error('Error de conexión a la base de datos o al realizar la consulta:', err);
    process.exit(1);
  }
};

// Llamada a la función para conectar
connectDb();

export default client;
