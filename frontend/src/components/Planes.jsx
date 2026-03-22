import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Zap, Globe, Star, Users } from "lucide-react";

const PLANES = [
  {
    id: "basico",
    nombre: "Plan Básico",
    votos: "Hasta 100",
    precio: "$0",
    descripcion: "Ideal para pruebas, simulacros o pequeñas votaciones locales.",
    icon: <Users className="w-8 h-8" />,
    color: "bg-gray-500",
    features: [
      "Votación única por RUT",
      "Auditoría post-voto",
      "Resultados en tiempo real",
      "Soporte por email"
    ],
    highlight: false,
  },
  {
    id: "pro",
    nombre: "Plan Profesional",
    votos: "Hasta 1.000",
    precio: "$50",
    descripcion: "Elecciones de carrera, facultades o centros de estudiantes grandes.",
    icon: <Zap className="w-8 h-8" />,
    color: "bg-orange-600",
    features: [
      "Todo lo del plan Básico",
      "Personalización de logos",
      "Verificación por Microsoft 365",
      "Soporte prioritario 24/7",
      "Reporte estadístico avanzado"
    ],
    highlight: true,
  }
];

const Planes = () => {
  return (
    <section id="planes" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-2 block">
            Pricing & Capacidad
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-6">
            Planes a tu <span className="text-orange-600">Medida</span>
          </h2>
          <p className="max-w-2xl mx-auto text-[var(--color-text)] opacity-70 text-lg">
            Escoge el nivel de seguridad y escala que tu proceso electoral requiere. Basado en la cantidad total de votantes esperados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {PLANES.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col h-full p-8 rounded-3xl border transition-all duration-500 relative ${
                plan.highlight 
                  ? "bg-[var(--color-background-secondary)] border-orange-500 shadow-2xl shadow-orange-600/20 z-10" 
                  : "bg-[var(--color-background-secondary)] border-[var(--border-color)] hover:border-orange-500/50 shadow-lg"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-orange-600/30">
                  <Star className="w-3.5 h-3.5 fill-current" /> Recomendado
                </div>
              )}

              <div className="mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-5 ${plan.color} shadow-lg shadow-black/10`}>
                  {React.cloneElement(plan.icon, { className: "w-7 h-7" })}
                </div>
                <h3 className="text-2xl font-black text-[var(--color-text)] mb-2">
                  {plan.nombre}
                </h3>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-[var(--color-text)] opacity-40 text-xs font-bold uppercase tracking-wider">Desde</span>
                  <span className="text-4xl font-black text-[var(--color-text)] tracking-tighter">
                    {plan.id === "basico" ? "$0" : "$50.000"}
                  </span>
                  <span className="text-[var(--color-text)] opacity-40 text-xs font-bold uppercase tracking-wider">CLP</span>
                </div>
                <div className="mt-4 text-orange-600 font-bold flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-xl w-fit">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">{plan.votos} Votantes</span>
                </div>
              </div>

              <p className="text-[var(--color-text)] opacity-70 text-sm mb-6 leading-relaxed">
                {plan.descripcion}
              </p>

              <div className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-600 border border-orange-500/20">
                      <Check className="w-3 h-3 stroke-[3px]" />
                    </div>
                    <span className="text-sm text-[var(--color-text)] opacity-80 leading-snug">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/auth"
                className={`w-full py-4 px-6 font-extrabold rounded-2xl transition-all duration-300 active:scale-95 text-center text-base ${
                  plan.highlight
                    ? "bg-orange-600 text-white shadow-xl shadow-orange-600/25 hover:bg-orange-700 hover:shadow-orange-600/40"
                    : "bg-[var(--color-background)] text-[var(--color-text)] border-2 border-[var(--border-color)] hover:border-orange-600 hover:text-orange-600"
                }`}
              >
                Empezar Ahora
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Shortcut */}
        <div className="mt-20 text-center">
          <p className="text-[var(--color-text)] opacity-60 text-base flex items-center justify-center gap-3">
            <Globe className="w-5 h-5" />
            ¿Necesitas un plan personalizado para tu universidad? 
            <Link to="/nosotros" className="text-orange-600 font-bold hover:underline uppercase text-sm tracking-widest ml-1">Contáctanos</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Planes;
