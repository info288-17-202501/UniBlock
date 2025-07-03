const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const Block = require('../blockchain/block'); 
const { cargarClaves } = require('../blockchain/crypto-utils'); 
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
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

// **Modificación:** Mensaje más claro al inicio sobre el estado de la cadena
if (blockchain.cadena.length === 0 && ES_VALIDADOR) {
    try {
        blockchain.crearGenesis(claves.publicKey, claves.privateKey);
        console.log('✅ Bloque Génesis creado. La cadena estaba vacía.');
    } catch (error) {
        console.error('❌ Error al crear el Bloque Génesis:', error.message);
        process.exit(1);
    }
} else if (blockchain.cadena.length > 0) {
    console.log(`✅ Blockchain cargada desde disco con ${blockchain.cadena.length} bloques.`);
    
    if (!blockchain.esCadenaValida(blockchain.cadena)) {
        console.error('⚠️ La cadena cargada desde disco NO es válida. Esto podría causar problemas de sincronización con otros nodos.');
    }
}


// ENDPOINT: recibe bloques externos
app.post('/nuevo-bloque', (req, res) => {
    const datos = req.body;
    const bloqueRecibido = new Block(
        datos.index,
        datos.timestamp,
        datos.idVotacion,
        datos.votos,
        datos.hashAnterior,
        datos.publicKey
    );
    bloqueRecibido.hashPropio = datos.hashPropio;
    bloqueRecibido.firmaDigital = datos.firmaDigital;

    const exito = blockchain.agregarBloque(bloqueRecibido);

    if (exito) {
        console.log(`✅ Bloque ${bloqueRecibido.index} recibido y agregado exitosamente.`);
    } else {
        console.error(`❌ Bloque ${bloqueRecibido.index} recibido de un peer PERO RECHAZADO por la lógica de 'agregarBloque'.`);
        console.error(`   Datos del bloque recibido:`, bloqueRecibido); // Útil para depurar
    }
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
                    'ngrok-skip-browser-warning': 'true' // Para entornos como ngrok
                }
            });

            const cadenaRecibidaComoInstancias = data.map(b => {
                const blockInstance = new Block(b.index, b.timestamp, b.idVotacion, b.votos, b.hashAnterior, b.publicKey);
                blockInstance.hashPropio = b.hashPropio;
                blockInstance.firmaDigital = b.firmaDigital;
                return blockInstance;
            });

            if (cadenaRecibidaComoInstancias.length > blockchain.cadena.length) { 
                if (blockchain.esCadenaValida(cadenaRecibidaComoInstancias)) {
                    blockchain.cadena = cadenaRecibidaComoInstancias; 
                    blockchain.guardarEnDisco();
                    console.log(`✅ Cadena sincronizada desde ${peer} con ${cadenaRecibidaComoInstancias.length} bloques.`);
                } else {
                    console.error(`❌ Cadena recibida de ${peer} RECHAZADA durante la sincronización. La cadena no es válida.`);
                }
            } else {
                // console.log(`ℹ️  La cadena de ${peer} no es más larga (${data.length} vs ${blockchain.cadena.length}). No se requiere sincronización.`); // Descomentar para depuración exhaustiva
            }
        } catch (err) {
            if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
                console.log(`⚠️  No se pudo conectar a ${peer} (probablemente inactivo o inaccesible).`);
            } else {
                console.error(`❌ Error inesperado durante la sincronización con ${peer}: ${err.message}`);
                // console.error(err); // Descomentar para ver el stack trace completo del error
            }
        }
    }
}

sincronizar();
setInterval(sincronizar, 10000);

app.listen(PORT, () => {
    console.log(`Nodo ejecutándose en puerto ${PORT} (validador=${ES_VALIDADOR})`);
});

// El endpoint /votar: recibe votos y propaga. La lógica aquí es correcta en su intención.
app.post('/votar', async (req, res) => {
    const { idVotacion, votos } = req.body;

    if (!ES_VALIDADOR) return res.status(403).json({ error: 'Este nodo no es validador' });

    if (!Array.isArray(votos) || votos.length === 0) {
        return res.status(400).json({ error: 'Se requiere una lista de votos' });
    }

    for (const voto of votos) {
        if (!voto.candidate_id || !voto.timestamp || !voto.firma || !voto.public_key) {
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
        console.log(`✅ Nuevo bloque ${nuevoBloque.index} creado localmente y agregado.`);
        // Propagar a otros peers
        for (const peer of PEERS) {
            try {
                await axios.post(peer + '/nuevo-bloque', nuevoBloque);
                console.log(`Bloque ${nuevoBloque.index} enviado a ${peer}`);
            } catch (err) {
                console.log(`Error enviando bloque a ${peer}: ${err.message}`);
            }
        }
    } else {
        console.error(`Falló la adición del nuevo bloque localmente. Revisa 'agregarBloque'.`);
    }

    res.json({ exito });
});