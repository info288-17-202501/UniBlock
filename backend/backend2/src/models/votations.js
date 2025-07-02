import { DataTypes } from 'sequelize';
import sequelize from '../config/sequalize.js'; 
import User from './users.js'; 

const Votation = sequelize.define('Votation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // 
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  public: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  UUID_user: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  status:{
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Activo', // Valores posibles: 'Activo', 'Pendiente', 'Terminada'
  }
}, {
  tableName: 'votations',
  timestamps: false,
});


// Método para calcular el estado actual
Votation.prototype.getStatus = function() {
  const now = new Date();
  const start = new Date(`${this.start_date}T${this.start_time}`);
  const end = new Date(`${this.end_date}T${this.end_time}`);

  if (now < start) return 'pending';
  if (now > end) return 'finished';
  return 'active';
};

export default Votation;