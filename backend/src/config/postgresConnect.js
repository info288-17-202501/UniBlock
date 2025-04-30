import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    return pool.query('SELECT NOW()');
  })
  .then(res => {
    console.log('Database time:', res.rows[0]);
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database or running test query:', err);
  });

export default pool;
