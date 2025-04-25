import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const preguntas = [
  {
    pregunta: '¿Qué es Blockchain?',
    respuesta:
      'Blockchain es una tecnología que permite registrar información de manera segura, descentralizada e inalterable. Es como un libro contable público distribuido entre muchos nodos.',
  },
  {
    pregunta: '¿Qué es el UniBlock?',
    respuesta:
      'UniBlock es un proyecto universitario desarrollado en el contexto de un sistema distribuido. Su objetivo es modernizar los procesos de votación dentro de la comunidad universitaria.',
  },
  {
    pregunta: '¿Cómo se garantiza la seguridad del voto?',
    respuesta:
      'El voto se almacena en una cadena de bloques, lo cual asegura que no pueda ser modificado una vez emitido, garantizando su integridad.',
  },
  {
    pregunta: '¿Quiénes pueden votar?',
    respuesta:
      'Pueden votar estudiantes universitarios UACh, docentes y funcionarios, para elegir cargos internos como centro de alumnos, rector o en movilizaciones.',
  },
  {
    pregunta: '¿Quiénes somos?',
    respuesta:
      'Somos estudiantes de 9no semestre de Ingeniería Civil Informática de la Universidad Austral de Chile.',
  },
  {
    pregunta: '¿Cómo nace el proyecto?',
    respuesta:
      'Nace como una necesidad de validar votaciones y evitar las votaciones presenciales con baja participación. Además, busca reemplazar los formularios tipo Forms, que son fácilmente manipulables y poco profesionales.',
  },
];

const PreguntasFrecuentes = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const togglePregunta = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="preguntas-frecuentes" className="py-10 px-5 lg:px-20">
      <h2 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {preguntas.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm bg-white"
          >
            <button
              onClick={() => togglePregunta(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none hover:underline cursor-pointer"
            >
              <span className="text-lg font-medium">{item.pregunta}</span>
              {activeIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {activeIndex === index && (
              <div className="px-4 pb-4 text-gray-700">{item.respuesta}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreguntasFrecuentes;
