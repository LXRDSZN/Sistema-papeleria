// src/server/models.js
import { DataTypes } from 'sequelize';
import sequelize from './database.js'; // Asegúrate de incluir .js

// Modelo de Usuario
const Usuario = sequelize.define('Usuario', {
  curp: {
    type: DataTypes.STRING(18),
    primaryKey: true,
  },
  apellido_paterno: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  apellido_materno: {
    type: DataTypes.STRING(50),
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(15),
  },
  usuario: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Modelo de Dirección
const Direccion = sequelize.define('Direccion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  curp: {
    type: DataTypes.STRING(18),
    references: {
      model: Usuario,
      key: 'curp',
    },
    onDelete: 'CASCADE',
  },
  calle: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  numero_exterior: {
    type: DataTypes.STRING(10),
  },
  numero_interior: {
    type: DataTypes.STRING(10),
  },
  colonia: {
    type: DataTypes.STRING(100),
  },
  ciudad: {
    type: DataTypes.STRING(100),
  },
  estado: {
    type: DataTypes.STRING(100),
  },
  codigo_postal: {
    type: DataTypes.STRING(10),
  },
  pais: {
    type: DataTypes.STRING(50),
    defaultValue: 'México',
  },
});

// Exportar los modelos
export { Usuario, Direccion };
