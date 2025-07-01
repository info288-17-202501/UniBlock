import { useAuth } from "@hooks/useAuthenticated";

const funcionPiola = () => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? "/user/dashboard" : "/auth" ;
};

const Hero = () => {
  return (
    <section id="hero" className="hero  h-screen  flex items-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
          <h1 className="text-6xl xl:text-7xl font-bold filter drop-shadow-[0_6px_6px_rgba(0,0,0,0.2)] z-0 text-[var(--color-text)] font-title ">
            UniBlock
          </h1>
          <p className="py-10 xl:max-w-[600px] text-[var(--color-text-secondary)] font-subtitle ">
            Bienvenido al sistema de votación basado en blockchain. Aquí puedes
            participar en elecciones de manera segura y transparente.
          </p>
          <div className="lg:py-10">
            <a
              href={funcionPiola()}
              className="btn border font-bold border-[var(--button-border-color)] bg-[var(--button-background-color)] text-[var(--button-text-color)] rounded-xl px-10 py-3 shadow-[0_4px_6px_rgba(0,0,0,0.7)] hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.9)] hover:bg-[var(--button-background-color-hover)] transition-all duration-300 ease-in-out"
            >
              Votar
            </a>
          </div>
        </div>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl lg:w-1/2">
          <img
            src="/Fondos/fondo1.png"
            alt="Imagen votación blockchain"
            className="w-full h-auto rounded-2xl "
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
