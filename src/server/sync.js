// src/server/sync.js
import sequelize from './database.js';
import { Usuario, Direccion } from './models.js';

const syncDatabase = async () => {
  try {
    // Conectar a la base de datos y sincronizar los modelos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
