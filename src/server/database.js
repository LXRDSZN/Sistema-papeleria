// src/server/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('g_systema_papeleria', 'postgres', 'bcb96dbdb1', {  
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
