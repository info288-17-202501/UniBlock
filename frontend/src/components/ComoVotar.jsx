import React from "react";

const ComoVotar = () => {
  return (
    <section id="como-votar" className="mt-24">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">
        Cómo votar
      </h2>
      <div className="flex flex-col justify-center items-center lg:flex-row gap-10 xl:gap-40">
        <div className="paso1 w-24 h-24 border-2 border-[var(--border-color)] rounded-full p-10 flex items-center justify-center text-xl font-bold">
          <span className="text-[var(--color-text)]">1</span>
        </div>
        <div className="paso2 w-24 h-24 border-2 border-[var(--border-color)] rounded-full p-10 flex items-center justify-center text-xl font-bold">
          <span className="text-[var(--color-text)]">2</span>
        </div>
        <div className="paso3 w-24 h-24 border-2 border-[var(--border-color)] rounded-full p-10 flex items-center justify-center text-xl font-bold">
          <span className="text-[var(--color-text)]">3</span>
        </div>
      </div>
    </section>
  );
};

export default ComoVotar;
