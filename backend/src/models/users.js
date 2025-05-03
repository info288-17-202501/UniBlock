import { DataTypes } from 'sequelize';
import sequelize from '../config/sequalize.js'; 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'alumno'
  },
  institucion: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'UACh'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'isAdmin' // Esto fuerza a Sequelize a usar exactamente este nombre
  },
}, {
  tableName: 'users',
  timestamps: false, 
  underscored: true
});

export default User;
