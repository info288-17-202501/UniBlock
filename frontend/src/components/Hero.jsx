import React from "react";
import { useAuth } from "@hooks/useAuthenticated";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Laptop, Tablet, Fingerprint } from "lucide-react";

const funcionPiola = () => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? "/user/dashboard" : "/auth" ;
};

const Hero = () => {
  return (
    <section id="hero" className="relative hero min-h-screen flex items-center pt-28 pb-12 sm:pt-20 sm:pb-12 overflow-hidden w-full">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <div className="max-w-2xl text-center lg:text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center lg:justify-start">
              <span className="inline-block py-2 px-4 sm:px-5 rounded-full bg-orange-500/10 text-orange-600 font-bold text-[10px] sm:text-sm mb-6 border border-orange-500/20 uppercase tracking-widest max-w-[280px] sm:max-w-none leading-tight">
                Votación Digital Segura & Descentralizada
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-8xl font-black text-[var(--color-text)] leading-[1.1] mb-6 sm:mb-8 text-balance">
              Tu Voto, <br />
              <span className="text-orange-600">Inmortalizado.</span>
            </h1>
            
            <div className="py-2 mb-8 sm:mb-10">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-text)] opacity-90 mb-4 leading-snug max-w-xl mx-auto lg:mx-0">
                ¿Cansado de filas eternas y falta de transparencia?
              </p>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                UniBlock garantiza resultados <span className="text-orange-600 font-bold underline decoration-orange-600/30">100% inalterables</span> mediante tecnología Blockchain de vanguardia.
              </p>
            </div>

            {/* CTA and Device Support */}
            <div className="flex flex-col items-center lg:items-start gap-8 mb-12">
              <a
                href={funcionPiola()}
                className="btn bg-orange-600 text-white font-black rounded-2xl px-12 py-5 text-xl shadow-2xl shadow-orange-600/30 hover:bg-orange-700 hover:shadow-orange-600/60 transition-all duration-300 active:scale-95 w-full sm:w-auto text-center"
              >
                Votar ahora
              </a>
              
              <div className="flex items-center gap-4 sm:gap-6 px-6 py-4 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--border-color)] shadow-sm max-w-full overflow-x-auto no-scrollbar">
                {[
                  { icon: <Monitor />, label: "PC" },
                  { icon: <Laptop />, label: "Mac" },
                  { icon: <Tablet />, label: "Tablet" },
                  { icon: <Smartphone />, label: "Phone" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 group flex-shrink-0">
                    {React.cloneElement(item.icon, { className: "w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" })}
                    <span className="text-[9px] font-black uppercase tracking-tighter text-[var(--color-text)] opacity-70">{item.label}</span>
                  </div>
                ))}
                <div className="w-px h-8 bg-[var(--border-color)] mx-1 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[var(--color-text)] opacity-80 whitespace-nowrap">
                  Cualquier dispositivo
                </span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-8 border-t border-[var(--border-color)] text-center sm:text-left">
              {[
                { title: "Criptografía", desc: "Voto encriptado de extremo a extremo" },
                { title: "Inalterable", desc: "Historial inmutable en la red" },
                { title: "Verificación", desc: "Comprueba tu voto en tiempo real" }
              ].map((pill, i) => (
                <div key={i} className="flex flex-col gap-1">
                   <h4 className="font-black text-orange-600 text-lg sm:text-base xl:text-lg uppercase tracking-tighter leading-none">{pill.title}</h4>
                   <p className="text-sm text-[var(--color-text)] opacity-50 font-medium leading-tight">{pill.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 relative flex justify-center"
        >
          {/* Decorative Elements */}
          <div className="absolute -inset-10 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 p-2 sm:p-4 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
            <img
              src="/Fondos/hero_blockchain_voting.png"
              alt="Blockchain Digital Voting"
              className="w-full h-auto rounded-[2rem] sm:rounded-[2.5rem] shadow-xl relative z-10"
            />
          </div>
          
          {/* Floating Badge (Hidden on very small screens or adjusted) */}
          <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-[var(--color-background-secondary)] p-4 sm:p-6 rounded-[1.5em] sm:rounded-[2rem] shadow-2xl z-20 border border-orange-500/30 animate-float items-center gap-4">
             <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-600/40">
               <Fingerprint className="w-7 h-7" />
             </div>
             <div>
                <p className="font-black text-[var(--color-text)] text-base leading-none">Security Layer 1.0</p>
                <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest mt-1">Blockchain Verified</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
