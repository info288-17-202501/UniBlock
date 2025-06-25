import React from "react";

const TerminosCondiciones = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-[var(--color-text)]">
      <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>

      <p className="mb-4">
        Bienvenido al sistema de votación universitaria UniBlock, una plataforma
        basada en tecnología blockchain orientada a garantizar procesos electorales
        transparentes, seguros y confiables dentro del ámbito universitario.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Aceptación de los términos</h2>
      <p className="mb-4">
        Al acceder y utilizar esta plataforma, usted acepta estos Términos y Condiciones.
        Si no está de acuerdo con alguna parte de los términos, no debe utilizar el sistema.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Uso de la plataforma</h2>
      <p className="mb-4">
        El sistema está destinado exclusivamente a estudiantes, funcionarios y autoridades
        autorizadas por la universidad para participar en procesos de votación oficiales.
        Cada usuario debe hacer uso del sistema de forma ética y responsable.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Seguridad y tecnología blockchain</h2>
      <p className="mb-4">
        Los datos de las votaciones son registrados en una red blockchain con el fin de
        garantizar la integridad, transparencia y trazabilidad de cada sufragio.
        No es posible modificar, eliminar ni manipular los votos emitidos una vez registrados.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Privacidad de los usuarios</h2>
      <p className="mb-4">
        El sistema puede recopilar datos personales mínimos como nombre, correo institucional
        y carrera, únicamente con fines de verificación de identidad. Ningún dato será
        compartido con terceros ni utilizado con fines comerciales.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Responsabilidad</h2>
      <p className="mb-4">
        UniBlock no se hace responsable por accesos no autorizados causados por negligencia del usuario,
        como compartir contraseñas o dejar sesiones abiertas en dispositivos públicos.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Cambios en los términos</h2>
      <p className="mb-4">
        Nos reservamos el derecho de modificar estos términos en cualquier momento. Se notificará a los usuarios
        mediante la plataforma y el uso continuo del sistema implica la aceptación de los cambios.
      </p>
      
    </div>
  );
};

export default TerminosCondiciones;
