import React, { useState, useEffect } from "react";
import votacionesData from "../data/ProximasVotaciones.json"; // Ajusta el path según donde pongas el JSON

const ProximasVotaciones = () => {
  const [tiemposRestantes, setTiemposRestantes] = useState([]);

  useEffect(() => {
    const calcularTiempos = () => {
      const ahora = new Date().getTime();
      const nuevosTiempos = votacionesData.map((votacion) => {
        const fechaInicio = new Date(votacion.fechaInicio).getTime(); // Convertimos string a Date
        return fechaInicio - ahora;
      });
      setTiemposRestantes(nuevosTiempos);
    };

    calcularTiempos();
    const intervalo = setInterval(calcularTiempos, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const formatearTiempo = (milisegundos) => {
    if (milisegundos <= 0) {
      return "¡Ya puedes votar!";
    }
    const segundos = Math.floor(milisegundos / 1000);
    const dias = Math.floor(segundos / (3600 * 24));
    const horas = Math.floor((segundos % (3600 * 24)) / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    return `${dias}d ${horas}h ${minutos}m ${segundosRestantes}s`;
  };

  return (
    <section id="proximas-votaciones" className="mt-24">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">
        Próximas votaciones
      </h2>
      <div className="space-y-6">
        {votacionesData.map((votacion, index) => (
          <div
            key={index}
            className="p-4 border border-[var(--border-color)] rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
              {votacion.titulo}
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-2">
              Comienza en:{" "}
              <span className="font-mono">
                {formatearTiempo(tiemposRestantes[index])}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProximasVotaciones;
