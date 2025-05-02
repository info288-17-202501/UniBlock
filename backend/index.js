import express from 'express';
import cors from 'cors'; 
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { authRouter } from './src/routes/Auth.js'; 
import { loginRouter } from "./src/routes/microsoft.js";
import  sequelize  from './src/config/sequalize.js'; // Asegúrate de que la ruta sea correcta
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


app.get('/api/test-sequelize', async (_, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: 'Conexión exitosa a la base de datos con Sequelize' });
  } catch (error) {
    console.error('Error al conectar a la base de datos con Sequelize:', error);
    res.status(500).json({ message: 'Error en la conexión a la base de datos con Sequelize', error });
  }
});


app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// app.listen(port, () => {
//   console.log(`Servidor con CORS corriendo en http://localhost:${port}`);
// });


app.listen(3000, () => console.log("http://localhost:3000"));