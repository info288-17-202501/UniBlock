import sequelize from '../config/sequalize.js';
import User from './users.js';
import Votation from './votations.js';
import Candidate from './candidates.js';

// Definir asociaciones
Votation.hasMany(Candidate, {
  foreignKey: 'id_votation',
  as: 'candidates',
});

Candidate.belongsTo(Votation, {
  foreignKey: 'id_votation',
  as: 'votation',
});

// Exportar modelos y sequelize
export {
  sequelize,
  User,
  Votation,
  Candidate,
};
