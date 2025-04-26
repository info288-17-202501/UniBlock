import React from 'react';
import usuariosData from '../data/Usuarios.json';

const Usuarios = () => {
  return (
    <section id="usuarios" className="bg-gray-50 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-12 text-gray-800">Ellos confían en nosotros</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {usuariosData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition border"
          >
            <img
              src={item.imagen}
              alt="Logo"
              className="max-h-24 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Usuarios;

