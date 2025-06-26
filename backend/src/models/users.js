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
    allowNull: true
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
    field: 'isAdmin' 
  },
  publicKey: {
  type: DataTypes.TEXT, 
  allowNull: false,
  field: 'publicKey' 
  },
  privateKey: {
    type: DataTypes.TEXT, 
    allowNull: false,
    field: 'privateKey' 
  },
  ivPriv: {
    type: DataTypes.STRING(24), // 16 bytes para AES-256-CBC, pero puedes ajustar según tu necesidad
    allowNull: false,
    field: 'ivPriv'    
  }
}, {
  tableName: 'users',
  timestamps: false, 
  underscored: true
});

export default User;
