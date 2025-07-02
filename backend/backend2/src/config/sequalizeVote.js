import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_VOTES_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,  // Dejarlo en false si no tienes certificado CA propio
    },
  },
  logging: false,
  timezone: "America/Santiago",
});

sequelize.authenticate()
  .then(() => console.log("[*] Conexión exitosa a la base de datos [Votes]"))
  .catch((err) => console.error("[X] Error conectando a la base de datos:", err));

export default sequelize;
