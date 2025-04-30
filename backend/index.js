import express from 'express';
import cors from 'cors'; 
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { authRouter } from './src/routes/Auth.js'; 
import pool from './src/config/postgresConnect.js'; // Asegúrate de que la ruta sea correcta
import { loginRouter } from "./src/routes/microsoft.js";
import passport from "passport";
import "./src/middlewares/microsoft.js";


dotenv.config();
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173', // URL de tu frontend
  credentials: true, // Permitir el uso de credenciales (como cookies)
};

app.use(cors(corsOptions)); // Usar CORS con las opciones configuradas

app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});


// // ENDPOINTS
app.use("/api/auth", authRouter); // uniblock
app.use("/auth", loginRouter);  //microsoft


app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Conexión exitosa', time: result.rows[0] });
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ message: 'Error en la conexión a la base de datos', error });
  }
});


// app.listen(port, () => {
//   console.log(`Servidor con CORS corriendo en http://localhost:${port}`);
// });


app.listen(3000, () => console.log("http://localhost:3000"));