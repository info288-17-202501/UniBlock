import React from "react";

const AcercaDe = () => {
  return (
    <section id="acerca-de">
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">
        Acerca de
      </h2>
      <div className="max-w-3xl mx-auto text-center text-[var(--color-text)] space-y-6">
        <p>
          En Uniblock creemos en la transparencia, la confianza y la innovación
          como pilares fundamentales para construir procesos de votación
          modernos y seguros.
        </p>
        <p>
          Nuestra plataforma utiliza tecnología blockchain para garantizar que
          cada voto sea único, verificable e inalterable. Así, aseguramos
          elecciones justas donde cada voz realmente cuenta.
        </p>
        <p>
          Estamos comprometidos con acercar la tecnología a las personas,
          haciendo que votar sea más accesible, confiable y simple para todos
          los ciudadanos.
        </p>
      </div>
    </section>
  );
};

export default AcercaDe;
