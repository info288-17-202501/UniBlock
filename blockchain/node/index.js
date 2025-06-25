const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const Block = require('../blockchain/block');
const { cargarClaves } = require('../blockchain/crypto-utils');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const PEERS = process.env.PEERS ? process.env.PEERS.split(',') : []; // ejemplo: http://192.168.1.10:3001

const ES_VALIDADOR = process.env.VALIDADOR === 'true';
const claves = cargarClaves(__dirname + '/keypair.json');
const blockchain = new Blockchain();

blockchain.cargarDesdeDisco();
if (blockchain.cadena.length === 0 && ES_VALIDADOR) {
    blockchain.crearGenesis(claves.publicKey, claves.privateKey);
}

// ENDPOINT: recibe bloques externos
app.post('/nuevo-bloque', (req, res) => {
    const datos = req.body;
    const bloque = new Block(
        datos.index,
        datos.timestamp,
        datos.idVotacion,
        datos.votos,
        datos.hashAnterior,
        datos.publicKey
    );
    bloque.hashPropio = datos.hashPropio;
    bloque.firmaDigital = datos.firmaDigital;

    const exito = blockchain.agregarBloque(bloque);
    res.json({ exito });
});

// ENDPOINT: devuelve la cadena
app.get('/cadena', (req, res) => {
    res.json(blockchain.cadena);
});

// ENDPOINT: sincronizar con peer
async function sincronizar() {
    for (const peer of PEERS) {
        try {
            const { data } = await axios.get(peer + '/cadena');
            if (data.length > blockchain.cadena.length) {
                blockchain.cadena = data;
                blockchain.guardarEnDisco();
                console.log('Cadena actualizada desde', peer);
            }
        } catch (err) {
            console.log('No se pudo conectar a', peer);
        }
    }
}

// Intentar sincronizar al inicio si no es validador
if (!ES_VALIDADOR) {
    sincronizar();
    setInterval(sincronizar, 10000); // cada 10 segundos
}

app.listen(PORT, () => {
    console.log(`Nodo ejecutándose en puerto ${PORT} (validador=${ES_VALIDADOR})`);
});

// Recibe solo los votos y construye el bloque completo
app.post('/votar', (req, res) => {
    const { idVotacion, votos } = req.body;

    if (!ES_VALIDADOR) return res.status(403).json({ error: 'Este nodo no es validador' });

    const ultimo = blockchain.obtenerUltimoBloque();
    const bloque = new Block(
        ultimo.index + 1,
        new Date().toISOString(),
        idVotacion,
        votos,
        ultimo.hashPropio,
        claves.publicKey
    );
    bloque.hashPropio = bloque.calcularHash();
    bloque.firmarBloque(claves.privateKey);

    const exito = blockchain.agregarBloque(bloque);
    res.json({ exito });
});
