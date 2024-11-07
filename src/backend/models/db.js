import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  user: 'postgres',            // Usuario proporcionado
  host: 'localhost',           // PostgreSQL local
  database: 'g_systema_papeleria', // Nombre de la base de datos
  password: 'bcb96dbdb1',      // Contraseña proporcionada
  port: 5432,                  // Puerto de PostgreSQL
});

// Conecxion a la base de datos
const connectDb = async () => {
  try {
    await client.connect();  
    console.log('Conexión a la base de datos PostgreSQL establecida');

    // Realiza una consulta simple para verificar la conexión
    const res = await client.query('SELECT NOW()');
    console.log('Hora actual en la base de datos:', res.rows[0].now);

  } catch (err) {
    console.error('Error de conexión a la base de datos:', err);
    process.exit(1);
  }
};

// Llamada a la función para conectar
connectDb();

export default client;
