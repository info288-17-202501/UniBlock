const axios = require('axios');

(async () => {
    // Esto simula lo que haría tu página web
    const datosVotacion = {
        idVotacion: 'VOTACION001',
        votos: [
            { opcion: 'A', timestamp: new Date().toISOString() },
            { opcion: 'B', timestamp: new Date().toISOString() }
        ]
    };

    await axios.post('http://localhost:3000/votar', datosVotacion)
        .then(res => console.log('Respuesta:', res.data))
        .catch(err => console.error(err.response?.data || err.message));
})();
