const fs = require('fs');
const crypto = require('crypto');
const Block = require('./block');
const { verificarFirma } = require('./crypto-utils');
const VALIDADORES = require('./validadores');

class Blockchain {
    constructor() {
        this.cadena = [];
    }

    crearGenesis(publicKey, privateKey) {
        const genesis = new Block(0, new Date().toISOString(), 'GENESIS', [], '0', publicKey);
        genesis.firmarBloque(privateKey);
        this.cadena.push(genesis);
        this.guardarEnDisco();
    }

    agregarBloque(bloque) {
        this.cadena.push(bloque);
        if (!this.esCadenaValida()) {
            console.log('❌ Cadena inválida tras agregar bloque. Rechazado.');
            this.cadena.pop();
            return false;
        }
        this.guardarEnDisco();
        return true;
    }

    guardarEnDisco() {
        fs.writeFileSync('cadena.json', JSON.stringify(this.cadena, null, 2));
    }

    cargarDesdeDisco() {
        if (fs.existsSync('./cadena.json')) {
            const datos = JSON.parse(fs.readFileSync('./cadena.json'));
            if (this.esCadenaValida(datos)) {
                this.cadena = datos;
                console.log('✅ Blockchain cargada y validada desde disco.');
            } else {
                console.log('❌ Archivo corrupto: cadena inválida. No cargada.');
            }
        }
    }

    obtenerUltimoBloque() {
        return this.cadena[this.cadena.length - 1];
    }

    // 🔧 Función auxiliar para normalizar claves
    normalizarClave(clave) {
        return clave.replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ').trim();
    }

    esCadenaValida(cadena = this.cadena) {
        for (let i = 1; i < cadena.length; i++) {
            const actual = cadena[i];
            const anterior = cadena[i - 1];

            if (actual.hashAnterior !== anterior.hashPropio) {
                console.log(`❌ Hash anterior incorrecto en el bloque ${i}`);
                return false;
            }

            const copia = { ...actual };
            const hashEsperado = crypto.createHash('sha256')
                .update(`${copia.index}${copia.timestamp}${copia.idVotacion}${JSON.stringify(copia.votos)}${copia.hashAnterior}${copia.publicKey}`)
                .digest('hex');

            if (hashEsperado !== actual.hashPropio) {
                console.log(`❌ Hash inválido en el bloque ${i}`);
                return false;
            }

            // ✅ Validación con normalización de claves
            const claveActualNormalizada = this.normalizarClave(actual.publicKey);
            const validadorAutorizado = VALIDADORES.some(validador => {
                const validadorNormalizado = this.normalizarClave(validador);
                return validadorNormalizado === claveActualNormalizada;
            });

            if (!validadorAutorizado) {
                console.log(`❌ Bloque ${i} firmado por clave no autorizada`);
                console.log(`   Clave del bloque: "${claveActualNormalizada.substring(0, 50)}..."`);
                console.log(`   Primera clave validador: "${this.normalizarClave(VALIDADORES[0]).substring(0, 50)}..."`);
                return false;
            }

            if (!verificarFirma(actual.hashPropio, actual.firmaDigital, actual.publicKey)) {
                console.log(`❌ Firma digital inválida en el bloque ${i}`);
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;