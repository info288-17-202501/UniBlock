import React from 'react';

const ComoVotar = () => {
  return (
    <section id="como-votar">
      <h2 className="text-2xl font-bold mb-6">Cómo votar</h2>
      <div className="flex flex-col justify-center items-center lg:flex-row gap-10 xl:gap-40">
        <div className="paso1 w-24 h-24 border-2 rounded-full p-10 flex items-center justify-center text-xl font-bold">
          1
        </div>
        <div className="paso2 w-24 h-24 border-2 rounded-full p-10 flex items-center justify-center text-xl font-bold">
          2
        </div>
        <div className="paso3 w-24 h-24 border-2 rounded-full p-10 flex items-center justify-center text-xl font-bold">
          3
        </div>
      </div>
    </section>
  );
};

export default ComoVotar;
