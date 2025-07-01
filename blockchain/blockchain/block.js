const crypto = require('crypto');

class Block {
    constructor(index, timestamp, idVotacion, votos, hashAnterior, publicKey) {
        this.index = index;
        this.timestamp = timestamp;
        this.idVotacion = idVotacion;
        this.votos = votos;
        this.hashAnterior = hashAnterior;
        this.publicKey = publicKey;
        this.hashPropio = this.calcularHash();
        this.firmaDigital = null;
    }

    calcularHash() {
        const data = this.index + this.timestamp + this.idVotacion + JSON.stringify(this.votos) + this.hashAnterior + this.publicKey;
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    firmarBloque(privateKey) {
        const sign = crypto.createSign('SHA256');
        sign.update(this.hashPropio).end();
        this.firmaDigital = sign.sign(privateKey, 'hex');
    }

    verificarFirma() {
        const verify = crypto.createVerify('SHA256');
        verify.update(this.hashPropio);
        return verify.verify(this.publicKey, this.firmaDigital, 'hex');
    }
}

module.exports = Block;