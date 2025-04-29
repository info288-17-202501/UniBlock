// import express from 'express';
// import cors from 'cors'; 
// import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
// import { authRouter } from './src/routes/Auth.js'; 

// dotenv.config();
// const app = express();
// const port = 3001;

// const corsOptions = {
//   origin: 'http://localhost:5173', // URL de tu frontend
//   credentials: true, // Permitir el uso de credenciales (como cookies)
// };

// app.use(cors(corsOptions)); // Usar CORS con las opciones configuradas


// app.use(express.json());
// app.use(cookieParser());

// app.get('/', (req, res) => {
//   res.send('Bienvenido a la página principal');
// });


// // ENDPOINTS
// app.use("/api/auth", authRouter);


// app.use((req, res) => {
//   res.status(404).json({ message: "Ruta no encontrada" });
// });


// app.listen(port, () => {
//   console.log(`Servidor con CORS corriendo en http://localhost:${port}`);
// });



import express from "express";
import { loginRouter } from "./src/routes/microsoft.js";
import passport from "passport";
import "./src/middlewares/microsoft.js";

const app = express();

app.use(passport.initialize());

app.use("/auth", loginRouter);

app.listen(3000, () => console.log("http://localhost:3000"));