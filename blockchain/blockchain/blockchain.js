const fs = require('fs');
const Block = require('./block');

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

    agregarBloque(nuevoBloque) {
        const ultimo = this.cadena[this.cadena.length - 1];
        if (nuevoBloque.hashAnterior !== ultimo.hashPropio) return false;
        if (!nuevoBloque.verificarFirma()) return false;
        if (nuevoBloque.calcularHash() !== nuevoBloque.hashPropio) return false;
        this.cadena.push(nuevoBloque);
        this.guardarEnDisco();
        return true;
    }

    guardarEnDisco() {
        fs.writeFileSync('cadena.json', JSON.stringify(this.cadena, null, 2));
    }

    cargarDesdeDisco() {
        if (fs.existsSync('cadena.json')) {
            const datos = JSON.parse(fs.readFileSync('cadena.json'));
            this.cadena = datos;
        }
    }
    obtenerUltimoBloque() {
    return this.cadena[this.cadena.length - 1];
    }
}

module.exports = Blockchain;