import React from 'react';

const facultades = [
  { id: 1, imagen: '/facultades/ingenieria.jpg' },
  { id: 2, imagen: '/facultades/ciencias.png' },
  { id: 3, imagen: '/facultades/ciencias_sociales.jpg' },
  { id: 4, imagen: '/facultades/medicina.png' },
];

const Clientes = () => {
  return (
    <section id="clientes" className="bg-gray-50 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-12 text-gray-800">Ellos confían en nosotros</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {facultades.map((facultad) => (
          <div
            key={facultad.id}
            className="flex items-center justify-center bg-white py-8 px-4 shadow-md rounded-lg"
          >
            <img
              src={facultad.imagen}
              alt="Logo de facultad"
              className="max-h-28 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clientes;
