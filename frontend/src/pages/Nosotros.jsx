import React, { useEffect } from "react";
import integrantes from "../data/integrantes.json";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useDarkMode } from "@context/darkModeContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Nosotros = () => {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto text-[var(--color-text)]">
      <Link to="/" className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors mb-10 font-semibold group">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver atrás
      </Link>

      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-[var(--color-text)]"
        >
          Sobre Nosotros
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg opacity-80 max-w-3xl mx-auto leading-relaxed text-[var(--color-text)]"
        >
          Somos un equipo de estudiantes universitarios altamente enfocados en el desarrollo de 
          soluciones tecnológicas innovadoras. <span className="text-orange-500 font-bold">UniBlock</span> nace en 2025 como 
          un proyecto académico diseñado para garantizar procesos electorales transparentes, 
          inalterables y seguros en la comunidad universitaria mediante el uso avanzado de tecnología blockchain.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {integrantes.map(({ nombre, rol, linkedin, github }, index) => (
          <motion.div 
            key={nombre}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[var(--color-background-secondary)] rounded-3xl p-8 border border-[var(--border-color)] shadow-xl hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full mb-6 p-1 group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-[var(--color-background)] rounded-full flex items-center justify-center text-3xl font-bold text-[var(--color-text)]">
                {nombre.charAt(0)}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-[var(--color-text)]">{nombre}</h3>
            <p className="text-orange-500 font-medium mb-6">{rol}</p>
            
            <div className="flex gap-4 mt-auto">
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-blue-600/10 text-[#0077b5] rounded-full hover:bg-[#0077b5] hover:text-white transition-colors"
                title={`LinkedIn de ${nombre}`}
              >
                <FaLinkedin size={22} />
              </a>
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-500/10 text-[var(--color-text)] rounded-full hover:bg-[var(--color-text)] hover:text-[var(--color-background)] transition-colors"
                title={`GitHub de ${nombre}`}
              >
                <FaGithub size={22} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center p-8 bg-orange-500/10 rounded-2xl border border-orange-500/20 max-w-4xl mx-auto"
      >
        <p className="text-lg font-medium text-[var(--color-text)]">
          Agradecemos enormemente el valioso apoyo de todos quienes colaboraron 
          profesionalmente en la validación y testing de este sistema descentralizado.
        </p>
      </motion.div>

    </div>
  );
};

export default Nosotros;
