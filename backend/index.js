import express from 'express';
import cors from 'cors'; 
import { authRouter } from './src/routes/Auth.js'; 

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});


app.use("/api/auth", authRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});


app.listen(port, () => {
  console.log(`Servidor con CORS corriendo en http://localhost:${port}`);
});