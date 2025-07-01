const fs = require('fs');
const crypto = require('crypto');


function generarParClaves(nombreArchivo) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });

    const obj = {
        publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }),
        privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }),
    };

    fs.writeFileSync(nombreArchivo, JSON.stringify(obj, null, 2));
    return obj;
}

function cargarClaves(nombreArchivo) {
    const { publicKey, privateKey } = JSON.parse(fs.readFileSync(nombreArchivo));
    return { publicKey, privateKey };
}

function verificarFirma(hash, firmaHex, publicKey) {
    const verifier = crypto.createVerify('SHA256');
    verifier.update(hash);
    verifier.end();
    return verifier.verify(publicKey, Buffer.from(firmaHex, 'hex'));
}


module.exports = { generarParClaves, cargarClaves, verificarFirma };
