import React from "react";

const Nosotros = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-[var(--color-text)]">
      <h1 className="text-3xl font-bold mb-6">Sobre Nosotros</h1>

      <p className="mb-4">
        Somos un equipo de estudiantes universitarios comprometidos con el desarrollo de soluciones tecnológicas innovadoras.
        Este sistema de votación fue creado como parte de un proyecto académico que busca garantizar procesos electorales
        transparentes y seguros dentro de nuestra comunidad universitaria, utilizando tecnología blockchain.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">Integrantes del equipo</h2>

      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>
          Felipe Córdova –{" "}
          <a
            href="https://www.linkedin.com/in/tu-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </li>
        <li>
          Fernando Castillo –{" "}
          <a
            href="https://www.linkedin.com/in/link-del-segundo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </li>
        <li>
          Fernando Inzulza –{" "}
          <a
            href="https://www.linkedin.com/in/link-del-tercero"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </li>
        <li>
          Juan Santana –{" "}
          <a
            href="https://www.linkedin.com/in/link-del-tercero"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </li>
        <li>
          Cristóbal Pérez –{" "}
          <a
            href="https://www.linkedin.com/in/link-del-tercero"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </li>
        {/* Agrega más integrantes según sea necesario */}
      </ul>

      <p className="mb-4">
        Agradecemos el apoyo de todos quienes colaboraron en la validación del sistema.
      </p>
    </div>
  );
};

export default Nosotros;
