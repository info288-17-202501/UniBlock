import React from "react";

const PoliticasPrivacidad = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-[var(--color-text)]">
      <h1 className="text-3xl font-bold mb-6">Políticas de Privacidad</h1>

      <p className="mb-4">
        En UniBlock, nos comprometemos a proteger la privacidad de los usuarios
        de nuestro sistema de votación universitaria. Esta política describe cómo
        recopilamos, utilizamos y protegemos los datos personales.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Datos recopilados</h2>
      <p className="mb-4">
        Podemos recopilar los siguientes datos personales:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Nombre completo</li>
        <li>Correo electrónico institucional</li>
        <li>RUT o número de identificación universitaria</li>
        <li>Facultad o carrera</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Finalidad del tratamiento</h2>
      <p className="mb-4">
        Los datos personales son utilizados únicamente para:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Verificar la identidad del votante</li>
        <li>Permitir el acceso seguro a las votaciones</li>
        <li>Garantizar que cada usuario pueda emitir un solo voto</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Confidencialidad y seguridad</h2>
      <p className="mb-4">
        UniBlock aplica medidas técnicas y organizativas para proteger sus datos personales
        contra accesos no autorizados, pérdidas o divulgaciones. Solo el personal autorizado
        puede acceder a esta información.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Conservación de los datos</h2>
      <p className="mb-4">
        Los datos se almacenan únicamente durante el tiempo necesario para realizar el proceso
        de votación y validar los resultados. Una vez finalizado, se eliminan o anonimizan.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Derechos de los usuarios</h2>
      <p className="mb-4">
        Como usuario, usted tiene derecho a:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Solicitar acceso a sus datos personales</li>
        <li>Solicitar la rectificación o eliminación de sus datos</li>
        <li>Retirar su consentimiento en cualquier momento</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contacto</h2>
      <p className="mb-4">
        Para ejercer sus derechos o realizar consultas relacionadas con su privacidad, contáctenos
        mediante el formulario de contacto disponible en la plataforma.
      </p>
    </div>
  );
};

export default PoliticasPrivacidad;
