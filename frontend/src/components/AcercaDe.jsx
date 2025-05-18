import React from "react";

const AcercaDe = () => {
  return (
    <section id="acerca-de" className="rounded-lg bg-[var(--color-background-secondary)] px-6 py-16 text-[var(--color-text)]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 font-subtitle text-[var(--color-text)] ">
          Acerca de
        </h2>
        <p className="mb-4 text-lg leading-relaxed">
          En Uniblock creemos en la transparencia, la confianza y la innovación
          como pilares fundamentales para construir procesos de votación
          modernos y seguros.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          Nuestra plataforma utiliza tecnología blockchain para garantizar que
          cada voto sea único, verificable e inalterable. Así, aseguramos
          elecciones justas donde cada voz realmente cuenta.
        </p>
        <p className="text-lg leading-relaxed">
          Estamos comprometidos con acercar la tecnología a las personas,
          haciendo que votar sea más accesible, confiable y simple para todos
          los ciudadanos.
        </p>
      </div>
    </section>
  );
};

export default AcercaDe;
