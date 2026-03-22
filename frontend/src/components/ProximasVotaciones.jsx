import React, { useState, useEffect } from "react";
import votacionesData from "../data/ProximasVotaciones.json";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ShieldCheck } from "lucide-react";

const ProximasVotaciones = () => {
  const [tiemposRestantes, setTiemposRestantes] = useState([]);

  useEffect(() => {
    const calcularTiempos = () => {
      const ahora = new Date().getTime();
      const nuevosTiempos = votacionesData.map((votacion) => {
        const fechaInicio = new Date(votacion.fechaInicio).getTime();
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
      return { expired: true, text: "¡Votación Abierta!" };
    }
    const segundos = Math.floor(milisegundos / 1000);
    const dias = Math.floor(segundos / (3600 * 24));
    const horas = Math.floor((segundos % (3600 * 24)) / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;

    return {
      expired: false,
      dias,
      horas,
      minutos,
      segs,
      text: `${dias}d ${horas}h ${minutos}m ${segs}s`
    };
  };

  return (
    <section id="proximas-votaciones" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              Calendario Electoral
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)]">
              Próximas <span className="text-orange-600">Votaciones</span>
            </h2>
          </div>
          <p className="max-w-md text-[var(--color-text)] opacity-70 text-lg">
            Mantente informado sobre los próximos procesos y asegura tu participación ciudadana digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {votacionesData.map((votacion, index) => {
            const tiempo = formatearTiempo(tiemposRestantes[index]);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-[var(--color-background-secondary)] border border-[var(--border-color)] rounded-3xl shadow-lg hover:shadow-2xl hover:border-orange-500/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl group-hover:bg-orange-600/10 transition-colors" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-orange-600/10 text-orange-600 rounded-2xl">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                        {new Date(votacion.fechaInicio).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}
                      </span>
                      <span className="text-xs text-[var(--color-text)] opacity-50 font-medium">Año 2026</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4 leading-snug group-hover:text-orange-600 transition-colors">
                    {votacion.titulo}
                  </h3>
                  
                  <p className="text-[var(--color-text)] opacity-70 text-sm mb-8 leading-relaxed">
                    {votacion.descripcion || "Participa en este proceso electoral y haz valer tu derecho al voto de forma segura y transparente."}
                  </p>

                  <div className="mt-auto space-y-6">
                    {/* Countdown UI */}
                    <div className="bg-[var(--color-background)] p-4 rounded-2xl border border-[var(--border-color)] flex items-center justify-between">
                      {!tiempo.expired ? (
                        <div className="flex items-center space-x-4 w-full justify-around">
                          <div className="text-center">
                            <span className="block text-2xl font-black text-orange-600 leading-none">{tiempo.dias}</span>
                            <span className="text-[10px] font-bold text-[var(--color-text)] opacity-50 uppercase tracking-tighter">Días</span>
                          </div>
                          <div className="w-px h-8 bg-[var(--border-color)]" />
                          <div className="text-center">
                            <span className="block text-2xl font-black text-orange-600 leading-none">{tiempo.horas}</span>
                            <span className="text-[10px] font-bold text-[var(--color-text)] opacity-50 uppercase tracking-tighter">Horas</span>
                          </div>
                          <div className="w-px h-8 bg-[var(--border-color)]" />
                          <div className="text-center">
                            <span className="block text-2xl font-black text-orange-600 leading-none">{tiempo.minutos}</span>
                            <span className="text-[10px] font-bold text-[var(--color-text)] opacity-50 uppercase tracking-tighter">Min</span>
                          </div>
                          <div className="w-px h-8 bg-[var(--border-color)]" />
                          <div className="text-center">
                            <span className="block text-2xl font-black text-orange-600 leading-none">{tiempo.segs}</span>
                            <span className="text-[10px] font-bold text-[var(--color-text)] opacity-50 uppercase tracking-tighter">Seg</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full space-x-2 text-green-500 font-bold">
                          <ShieldCheck className="w-5 h-5" />
                          <span>¡Votación activa ahora!</span>
                        </div>
                      )}
                    </div>

                    <button 
                      className="w-full py-4 px-6 flex items-center justify-center space-x-2 bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-600/20 hover:bg-orange-700 hover:shadow-orange-600/30 hover:-translate-y-1 transition-all active:scale-95 group/btn"
                    >
                      <span>{tiempo.expired ? "Entrar al Portal" : "Ver Detalles"}</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProximasVotaciones;
