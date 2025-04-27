import React, { useState, useEffect } from 'react';

// Simulamos que tienes un array de próximas votaciones
const votaciones = [
  {
    titulo: 'Elección de Representantes 2025',
    fechaInicio: new Date('2025-05-01T10:00:00'), // Puedes ajustar estas fechas
  },
  {
    titulo: 'Votación Reforma de Estatutos',
    fechaInicio: new Date('2025-06-15T12:00:00'),
  },
];

const ProximasVotaciones = () => {
  const [tiemposRestantes, setTiemposRestantes] = useState([]);

  useEffect(() => {
    const calcularTiempos = () => {
      const ahora = new Date().getTime();
      const nuevosTiempos = votaciones.map((votacion) => {
        const tiempoRestante = votacion.fechaInicio.getTime() - ahora;
        return tiempoRestante;
      });
      setTiemposRestantes(nuevosTiempos);
    };

    calcularTiempos();
    const intervalo = setInterval(calcularTiempos, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const formatearTiempo = (milisegundos) => {
    if (milisegundos <= 0) {
      return '¡Ya puedes votar!';
    }
    const segundos = Math.floor(milisegundos / 1000);
    const dias = Math.floor(segundos / (3600 * 24));
    const horas = Math.floor((segundos % (3600 * 24)) / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    return `${dias}d ${horas}h ${minutos}m ${segundosRestantes}s`;
  };

  return (
    <section id="proximas-votaciones">
      <h2 className="text-3xl font-bold mb-6">Próximas votaciones</h2>
      <div className="space-y-6">
        {votaciones.map((votacion, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{votacion.titulo}</h3>
            <p className="text-gray-700">
              Comienza en: <span className="font-mono">{formatearTiempo(tiemposRestantes[index])}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProximasVotaciones;
