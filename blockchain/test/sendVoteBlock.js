const axios = require('axios');

(async () => {
    const datosVotacion = {
        idVotacion: '1',
        votos: [
            {
                candidateId: '1',
                timestamp: new Date().toISOString(),
                firma: 'FIRMA_DIGITAL_BASE64',
                publicKey: '-----BEGIN PUBLIC KEY-----\\nCLAVE_PUBLICA_AQUI...\\n-----END PUBLIC KEY-----'
            },
            {
                candidateId: '2',
                timestamp: new Date().toISOString(),
                firma: 'FIRMA_DIGITAL_BASE64',
                publicKey: '-----BEGIN PUBLIC KEY-----\\nCLAVE_PUBLICA_AQUI...\\n-----END PUBLIC KEY-----'
            }
        ]
    };

    await axios.post('http://localhost:3000/votar', datosVotacion)
        .then(res => console.log('Respuesta:', res.data))
        .catch(err => console.error(err.response?.data || err.message));
})();