import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
import Votations from './votations.js'; 

const AllowedUsers = sequelize.define('AllowedUsers', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UUID_eleccion: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Votations,
      key: 'id',
    },
  },
}, {
  tableName: 'allowed_users',
  timestamps: false,
});

export default AllowedUsers;