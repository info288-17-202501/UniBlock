import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const preguntas = [
  {
    pregunta: '¿Qué es Blockchain?',
    respuesta: (
      <>
        Blockchain es una tecnología que permite registrar información de manera segura, descentralizada e inalterable.{' '}
        <a
          href="https://aws.amazon.com/what-is/blockchain/?aws-products-all.sort-by=item.additionalFields.productNameLowercase&aws-products-all.sort-order=asc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Leer más
        </a>
      </>
    ),
  },
  {
    pregunta: '¿Qué es UniBlock?',
    respuesta: (
      <>
        UniBlock es un proyecto universitario desarrollado en el contexto del curso INFO288: Sistemas Distribuidos. Su objetivo es modernizar los procesos de votación dentro de la comunidad universitaria y busca ser el futuro de las votaciones.{' '}
        <a
          href="https://builtin.com/blockchain/blockchain-voting-future-elections"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Leer más
        </a>
      </>
    ),
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
      'Somos 5 estudiantes de 9no semestre de Ingeniería Civil en Informática de la Universidad Austral de Chile.',
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
    <section id="preguntas-frecuentes">
      <h2 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {preguntas.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => togglePregunta(index)}
              className="w-full flex justify-between items-center py-2 text-left hover:underline cursor-pointer"
            >
              <span className="text-lg font-medium">{item.pregunta}</span>
              {activeIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {activeIndex === index && (
              <div className="pl-1 pb-2 text-gray-700">{item.respuesta}</div>
            )}
            <hr className="my-2 border-gray-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreguntasFrecuentes;
