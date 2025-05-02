import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 4001;

app.use(express.json());
app.use(cors());


app.get('/', (_, res) => {
    res.send('Servidor de proxy en funcionamiento');
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});