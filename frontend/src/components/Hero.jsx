import { useAuth } from "@hooks/useAuthenticated";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Laptop, Tablet, Fingerprint } from "lucide-react";

const funcionPiola = () => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? "/user/dashboard" : "/auth" ;
};

const Hero = () => {
  return (
    <section id="hero" className="hero min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="max-w-2xl text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-5 rounded-full bg-orange-500/10 text-orange-600 font-bold text-xs sm:text-sm mb-6 border border-orange-500/20 uppercase tracking-widest">
              Votación Digital Segura & Descentralizada
            </span>
            <h1 className="text-5xl md:text-6xl xl:text-8xl font-black text-[var(--color-text)] leading-tight mb-8 text-balance">
              Tu Voto, <br />
              <span className="text-orange-600">Inmortalizado.</span>
            </h1>
            
            <div className="py-2 mb-10">
              <p className="text-xl md:text-2xl font-bold text-[var(--color-text)] opacity-90 mb-4 leading-snug">
                ¿Cansado de filas eternas y falta de transparencia?
              </p>
              <p className="text-[var(--color-text-secondary)] text-lg md:text-xl leading-relaxed max-w-xl">
                UniBlock garantiza resultados <span className="text-orange-600 font-bold underline decoration-orange-600/30">100% inalterables</span> mediante tecnología Blockchain de vanguardia.
              </p>
            </div>

            {/* Device Support Icons Refined */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 mb-12 w-full">
              <a
                href={funcionPiola()}
                className="btn bg-orange-600 text-white font-black rounded-2xl px-12 py-5 text-xl shadow-2xl shadow-orange-600/30 hover:bg-orange-700 hover:shadow-orange-600/60 transition-all duration-300 active:scale-95 translate-y-0 hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                Votar ahora
              </a>
              
              <div className="flex items-center gap-4 sm:gap-6 px-6 py-3 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--border-color)] shadow-sm w-full sm:w-auto overflow-x-auto">
                <div className="flex flex-col items-center gap-1 group">
                   <Monitor className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                   <span className="text-[9px] font-black uppercase tracking-tighter text-[var(--color-text)] opacity-70">PC</span>
                </div>
                <div className="flex flex-col items-center gap-1 group">
                   <Laptop className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                   <span className="text-[9px] font-black uppercase tracking-tighter text-[var(--color-text)] opacity-70">Mac</span>
                </div>
                <div className="flex flex-col items-center gap-1 group">
                   <Tablet className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                   <span className="text-[9px] font-black uppercase tracking-tighter text-[var(--color-text)] opacity-70">Tablet</span>
                </div>
                <div className="flex flex-col items-center gap-1 group">
                   <Smartphone className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                   <span className="text-[9px] font-black uppercase tracking-tighter text-[var(--color-text)] opacity-70">iPhone</span>
                </div>
                <div className="w-px h-8 bg-[var(--border-color)] mx-1" />
                <span className="text-sm font-bold text-[var(--color-text)] opacity-80 whitespace-nowrap">
                  En cualquier dispositivo
                </span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[var(--border-color)]">
              {[
                { title: "Criptografía", desc: "Voto encriptado de extremo a extremo" },
                { title: "Ledger Corruptible", desc: "Historial inalterable e invisible" },
                { title: "Verificación", desc: "Comprueba tu voto en la red" }
              ].map((pill, i) => (
                <div key={i} className="flex flex-col gap-1">
                   <h4 className="font-black text-orange-600 text-lg uppercase tracking-tighter leading-none">{pill.title}</h4>
                   <p className="text-sm text-[var(--color-text)] opacity-50 font-medium leading-tight">{pill.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 relative group"
        >
          {/* Decorative Elements */}
          <div className="absolute -inset-10 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 p-4 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl transition-all duration-500 group-hover:rotate-1 group-hover:scale-[1.02]">
            <img
              src="/Fondos/hero_blockchain_voting.png"
              alt="Blockchain Digital Voting Illustration"
              className="w-full h-auto rounded-[2.5rem] shadow-xl relative z-10"
            />
          </div>
          
          {/* Floating Badge Improved */}
          <div className="absolute -bottom-8 -right-8 bg-[var(--color-background-secondary)] p-6 rounded-[2rem] shadow-2xl z-20 border border-orange-500/30 animate-float">
             <div className="flex items-center gap-4">
               <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-600/40">
                 <Fingerprint className="w-8 h-8" />
               </div>
               <div>
                  <p className="font-black text-[var(--color-text)] text-lg leading-none">Security Layer 1.0</p>
                  <p className="text-xs text-orange-600 font-bold uppercase tracking-widest mt-1">Blockchain Verified</p>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
