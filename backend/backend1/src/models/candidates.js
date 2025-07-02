import { DataTypes } from 'sequelize';
import sequelize from '../config/sequalize.js';
import Votation from './votations.js';

const Candidate = sequelize.define('Candidate', {
  id: {
    type: DataTypes.INTEGER,  
    autoIncrement: true,     
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_votation: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Votation,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  number_of_votes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
}, {
  tableName: 'candidates',
  timestamps: false,
});

export default Candidate;
