import React from "react";
import integrantes from "../data/integrantes.json";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useDarkMode } from "@context/darkModeContext";

const Nosotros = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className="p-8 max-w-4xl mx-auto text-[var(--color-text)]">
      <h1 className="text-3xl font-bold mb-6">Sobre Nosotros</h1>

      <p className="mb-4">
        Somos un equipo de estudiantes universitarios comprometidos con el
        desarrollo de soluciones tecnológicas innovadoras. Este sistema de
        votación fue creado como parte de un proyecto académico que busca
        garantizar procesos electorales transparentes y seguros dentro de
        nuestra comunidad universitaria, utilizando tecnología blockchain.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">
        Integrantes del equipo
      </h2>

      <ul className="list-disc pl-5 space-y-4 mb-6">
        {integrantes.map(({ nombre, linkedin, github }) => (
          <li key={nombre}>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{nombre}</span>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
                title="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black"
                title="GitHub"
              >
                <FaGithub size={20} className={darkMode ? "text-white" : ""} />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <p className="mb-4">
        Agradecemos el apoyo de todos quienes colaboraron en la validación del
        sistema.
      </p>
    </div>
  );
};

export default Nosotros;
