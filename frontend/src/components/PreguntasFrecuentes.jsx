import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import preguntas from "../data/PreguntasFrecuentes.json";

const PreguntasFrecuentes = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const togglePregunta = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="preguntas-frecuentes" className="mt-24">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">
        Preguntas frecuentes
      </h2>
      <div className="space-y-4">
        {preguntas.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => togglePregunta(index)}
              // className="w-full flex justify-between items-center py-2 text-left hover:underline cursor-pointer"
              className="w-full flex justify-between items-center py-2 text-left hover:underline cursor-pointer text-[var(--color-text)]"
            >
              <span className="text-lg text-[var(--color-text)] font-medium">
                {item.pregunta}
              </span>
              {activeIndex === index ? (
                <ChevronUp className="w-5 h-5 text-[var(--color-text)]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[var(--color-text)]" />
              )}
            </button>
            {activeIndex === index && (
              <div className="pl-1 pb-2 text-[var(--color-text-secondary)]">
                {item.respuesta}
                {item.link_url && item.link_texto && (
                  <>
                    {" "}
                    <a
                      href={item.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {item.link_texto}
                    </a>
                  </>
                )}
              </div>
            )}
            <hr className="my-2 border-gray-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreguntasFrecuentes;
