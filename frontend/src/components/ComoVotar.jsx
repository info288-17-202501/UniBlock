import React from "react";
import { motion } from "framer-motion";
import { UserCheck, ListChecks, Fingerprint, DatabaseBackup } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Regístrate e Inicia",
    description: "Crea tu cuenta en UniBlock o inicia sesión de forma segura. Asegura tu participación en el proceso electoral.",
    icon: <UserCheck className="w-8 h-8 text-orange-500" />,
  },
  {
    id: 2,
    title: "Verifica Identidad",
    description: "Aseguramos que solo los votantes autorizados y validados por la organización puedan ejercer su derecho a voto.",
    icon: <Fingerprint className="w-8 h-8 text-purple-500" />,
  },
  {
    id: 3,
    title: "Emite tu Voto",
    description: "Navega a la elección activa, selecciona a tu candidato y confirma. Tu voto es firmado criptográficamente de inmediato.",
    icon: <ListChecks className="w-8 h-8 text-green-500" />,
  },
  {
    id: 4,
    title: "Registro Inmutable",
    description: "El smart contract registra tu voto en la blockchain. Es anónimo, inalterable y auditable por todos los ciudadanos.",
    icon: <DatabaseBackup className="w-8 h-8 text-orange-500" />,
  },
];

const ComoVotar = () => {
  return (
    <section id="como-votar" className="py-24 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-[var(--color-text)] mb-4"
          >
            ¿Cómo participar en la votación?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-[var(--color-text)] opacity-80 max-w-2xl mx-auto"
          >
            Votar en la red blockchain con UniBlock es ágil, seguro y 100% transparente. Sigue estos 4 pasos guiados para hacer que tu voz cuente de verdad.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative items-start">
          
          {/* Línea conectora (sólo visible en desktop grandes) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[12%] right-[12%] h-0.5 bg-[var(--border-color)] z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center group h-full"
            >
              {/* Circulo del Paso */}
              <div className="w-20 h-20 bg-[var(--color-background-secondary)] rounded-full border-4 border-[var(--border-color)] flex items-center justify-center mb-6 shadow-xl group-hover:border-orange-500 group-hover:scale-110 transition-all duration-300">
                {step.icon}
              </div>
              
              {/* Contenido del Paso */}
              <div className="bg-[var(--color-background-secondary)] p-6 rounded-2xl border border-[var(--border-color)] shadow-lg w-full flex-1 flex flex-col group-hover:shadow-orange-500/10 hover:border-orange-500/50 transition-all duration-300">
                <span className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-2">Paso {step.id}</span>
                <h3 className="text-xl md:text-lg lg:text-xl font-bold text-[var(--color-text)] mb-3">{step.title}</h3>
                <p className="text-[var(--color-text)] opacity-75 text-sm md:text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
          
        </div>

      </div>
    </section>
  );
};

export default ComoVotar;
