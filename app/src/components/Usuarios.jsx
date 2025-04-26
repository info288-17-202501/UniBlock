import React from 'react';

const facultades = [
  { id: 1, imagen: '/Puerto_Montt/Escuelas/oscuro/N. Enfermería-C.png' },
  { id: 2, imagen: '/Valdivia/Escuelas/oscuro/N. ESC. ING. INFORMATICA-C.png' },
  { id: 3, imagen: '/Valdivia/Facultades/oscuro/N. MEDICINA-C.png' },
  { id: 4, imagen: '/Puerto_Montt/Institutos/oscuro/N. Gestion e Industria-C.png' },
];

const Usuarios = () => {
  return (
    <section id="usuarios" className="bg-gray-50 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-12 text-gray-800">Ellos confían en nosotros</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {facultades.map((facultad) => (
          <div
            key={facultad.id}
            className="flex items-center justify-center bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition border"
          >
            <img
              src={facultad.imagen}
              alt="Logo de facultad"
              className="max-h-24 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Usuarios;
