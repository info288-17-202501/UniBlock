const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const Block = require('../blockchain/block');
const { cargarClaves } = require('../blockchain/crypto-utils');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const PEERS = process.env.PEERS ? process.env.PEERS.split(',') : [];

const ES_VALIDADOR = process.env.VALIDADOR === 'true';
let claves = null;
if (ES_VALIDADOR) {
    try {
        claves = cargarClaves(__dirname + '/keypair.json');
        console.log('✅ Claves cargadas para validador');
    } catch (error) {
        console.error('❌ Error cargando claves:', error.message);
        process.exit(1);
    }
} else {
    console.log('ℹ️  Nodo listener - no requiere claves');
}
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

// Sincronizar con peers
async function sincronizar() {
    for (const peer of PEERS) {
        try {
            const { data } = await axios.get(peer + '/cadena', {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
            if (data.length > blockchain.cadena.length && blockchain.esCadenaValida(data)) {
                blockchain.cadena = data;
                blockchain.guardarEnDisco();
                console.log(`✅ Cadena sincronizada desde ${peer}`);
            } else {
                console.log(`❌ Cadena rechazada desde ${peer}`);
            }
        } catch (err) {
            console.log(`⚠️  No se pudo conectar a ${peer}`);
        }
    }
}

sincronizar();
setInterval(sincronizar, 10000);

app.listen(PORT, () => {
    console.log(`Nodo ejecutándose en puerto ${PORT} (validador=${ES_VALIDADOR})`);
});

// ✅ NUEVO ENDPOINT /votar: recibe votos SIN votationId individual
app.post('/votar', async (req, res) => {
    const { idVotacion, votos } = req.body;

    if (!ES_VALIDADOR) return res.status(403).json({ error: 'Este nodo no es validador' });

    if (!Array.isArray(votos) || votos.length === 0) {
        return res.status(400).json({ error: 'Se requiere una lista de votos' });
    }

    for (const voto of votos) {
        if (!voto.candidateId || !voto.timestamp || !voto.firma || !voto.publicKey) {
            return res.status(400).json({ error: 'Faltan campos en al menos un voto' });
        }
    }

    const ultimo = blockchain.obtenerUltimoBloque();
    const nuevoBloque = new Block(
        ultimo.index + 1,
        new Date().toISOString(),
        idVotacion,
        votos,
        ultimo.hashPropio,
        claves.publicKey
    );
    nuevoBloque.hashPropio = nuevoBloque.calcularHash();
    nuevoBloque.firmarBloque(claves.privateKey);

    const exito = blockchain.agregarBloque(nuevoBloque);

    if (exito) {
        // 🔁 Propagar a otros peers
        for (const peer of PEERS) {
            try {
                await axios.post(peer + '/nuevo-bloque', nuevoBloque);
                console.log(`📤 Bloque enviado a ${peer}`);
            } catch (err) {
                console.log(`⚠️  Error enviando bloque a ${peer}: ${err.message}`);
            }
        }
    }

    res.json({ exito });
});