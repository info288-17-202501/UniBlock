import usuariosData from "../data/Usuarios.json";
import { useDarkMode } from "@context/darkModeContext";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonios = [
  {
    nombre: "Catalina Muñoz",
    rol: "Presidenta Centro de Estudiantes - Enfermería",
    comentario: "Gracias a UniBlock, las elecciones de nuestro centro de estudiantes fueron completamente transparentes. Todos pudieron verificar los resultados en tiempo real sin ninguna duda.",
    estrellas: 5,
  },
  {
    nombre: "Andrés Riquelme",
    rol: "Delegado de Carrera - Ing. Informática",
    comentario: "Usamos UniBlock para elegir delegados de carrera y fue impecable. El proceso fue rápido, seguro y nadie cuestionó los resultados gracias a la blockchain.",
    estrellas: 5,
  },
  {
    nombre: "Valentina Soto",
    rol: "Vocera Asamblea Estudiantil - Medicina",
    comentario: "En nuestra última movilización necesitábamos consultar a todo el estudiantado. UniBlock nos permitió realizar una votación masiva y obtener resultados confiables en horas.",
    estrellas: 5,
  },
  {
    nombre: "Diego Fuentes",
    rol: "Secretario General - Federación de Estudiantes",
    comentario: "Las votaciones internas de la federación siempre generaban desconfianza. Con UniBlock eso se acabó. El registro inmutable en blockchain le da legitimidad total al proceso.",
    estrellas: 5,
  },
];

const Usuarios = () => {
  const { darkMode } = useDarkMode();
  const modo = darkMode ? "claro" : "oscuro";
  const usuariosFiltrados = usuariosData[modo];

  return (
    <section id="usuarios" className="py-16 px-6 text-center mt-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)] mb-4"
      >
        Ellos confían en UniBlock
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-[var(--color-text)] opacity-70 mb-12 max-w-2xl mx-auto"
      >
        Instituciones y estudiantes que ya confiaron en nuestro sistema de votación blockchain para sus procesos electorales.
      </motion.p>

      {/* Logos de instituciones */}
      <div className="relative mb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {usuariosFiltrados.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center h-40 border-2 border-[var(--border-color)] bg-[var(--color-background-secondary)] p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-orange-500 hover:-translate-y-2 transition-all duration-500 group"
            >
              <img
                src={item.imagen}
                alt="Logo institución"
                className="max-h-24 w-full object-contain transition-all duration-500 scale-90 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonios */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-[var(--color-text)] mb-10"
      >
        Lo que dicen nuestros usuarios
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {testimonios.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="relative bg-[var(--color-background-secondary)] border border-[var(--border-color)] rounded-2xl p-6 text-left shadow-lg hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 group"
          >
            {/* Icono de comillas */}
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote className="w-10 h-10 text-orange-500" />
            </div>

            {/* Estrellas */}
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.estrellas }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
              ))}
            </div>

            {/* Comentario */}
            <p className="text-[var(--color-text)] opacity-80 text-sm leading-relaxed mb-4 italic">
              "{t.comentario}"
            </p>

            {/* Info del usuario */}
            <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-color)]">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {t.nombre.charAt(0)}
              </div>
              <div>
                <p className="text-[var(--color-text)] font-semibold text-sm">{t.nombre}</p>
                <p className="text-[var(--color-text)] opacity-60 text-xs">{t.rol}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Usuarios;
