import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Lock, Globe } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
    title: "Seguridad Inmutable",
    description: "Cada voto es encriptado y almacenado en la blockchain, asegurando que no pueda ser alterado ni eliminado.",
  },
  {
    icon: <Eye className="w-8 h-8 text-green-500" />,
    title: "Transparencia Total",
    description: "El proceso es auditable en tiempo real por cualquier ciudadano, garantizando elecciones justas.",
  },
  {
    icon: <Lock className="w-8 h-8 text-purple-500" />,
    title: "Privacidad Garantizada",
    description: "Tu identidad se protege pero tu voto se mantiene completamente secreto gracias a la criptografía avanzada.",
  },
  {
    icon: <Globe className="w-8 h-8 text-orange-500" />,
    title: "Fácil Accesibilidad",
    description: "Vota desde cualquier lugar y en cualquier momento con una interfaz amigable e intuitiva.",
  },
];

const AcercaDe = () => {
  return (
    <section id="acerca-de" className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Texto */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-0"
          >
            <h2 className="text-4xl font-extrabold mb-6 font-subtitle text-[var(--color-text)]">
              Acerca de UniBlock
            </h2>
            <div className="space-y-6 text-lg text-[var(--color-text)] opacity-80 leading-relaxed">
              <p>
                En Uniblock creemos en la transparencia, la confianza y la innovación como pilares fundamentales para construir procesos de votación modernos y verdaderamente seguros.
              </p>
              <p>
                Nuestra plataforma utiliza tecnología blockchain y Smart Contracts en la red de Ethereum para garantizar que cada voto sea único, verificable e inalterable. Aseguramos elecciones justas donde cada voz cuenta.
              </p>
              <p>
                Estamos comprometidos con acercar la tecnología Web3, haciendo que ejercer tu derecho a votar sea no solo simple, sino también 100% confiable y libre de manipulaciones externas o internas.
              </p>
            </div>
          </motion.div>

          {/* Columna Derecha: Tarjetas */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-[var(--color-background-secondary)] p-6 rounded-2xl shadow-lg border border-[var(--border-color)] hover:border-orange-500/50 transition-colors"
              >
                <div className="bg-orange-500/10 dark:bg-orange-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">{feature.title}</h3>
                <p className="text-[var(--color-text)] opacity-75 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AcercaDe;
