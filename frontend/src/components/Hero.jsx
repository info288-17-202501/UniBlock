import React from 'react';

const Hero = () => {
  return (
    <section className="hero h-screen lg:h-[90vh] flex items-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
          <h1 className="text-6xl xl:text-7xl font-bold">UniBlock</h1>
          <p className="py-10 xl:max-w-[600px] text-gray-700">
            Bienvenido al sistema de votación basado en blockchain. Aquí puedes participar en elecciones de manera segura y transparente.
          </p>
          <div className="lg:py-10">
            <a
              href="/login"
              className="btn border border-gray-300 rounded-xl px-6 py-3 hover:bg-gray-100 transition"
            >
              Votar
            </a>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <img
            src="/Fondos/fondo.avif"
            alt="Imagen votación blockchain"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
