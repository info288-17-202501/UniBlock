import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PoliticasPrivacidad = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-[var(--color-text)]">
      
      <Link to="/" className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors mb-8 font-semibold group">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver atrás
      </Link>

      <div className="bg-[var(--color-background-secondary)] p-8 md:p-12 rounded-3xl shadow-xl border border-[var(--border-color)]">
        <h1 className="text-4xl font-extrabold mb-8 text-orange-600 border-b pb-6 border-[var(--border-color)]">Políticas de Privacidad</h1>

        <div className="space-y-8 text-lg opacity-90 leading-relaxed">
          <p>
            En <strong>UniBlock</strong>, nos comprometemos a proteger la privacidad de los usuarios
            de nuestro sistema de votación universitaria. Esta política describe exhaustivamente cómo
            recopilamos, utilizamos y protegemos sus valiosos datos personales.
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">1. Datos recopilados</h2>
            <p className="mb-3">
              Podemos recopilar los siguientes datos de carácter personal estrictamente necesarios:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-2 opacity-80 bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-[var(--border-color)]">
              <li>Nombre completo</li>
              <li>Correo electrónico institucional acreditado</li>
              <li>RUT o número de identificación universitaria oficial</li>
              <li>Facultad o carrera de afiliación</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">2. Finalidad del tratamiento</h2>
            <p className="mb-3">
              Sus datos personales son utilizados de forma exclusiva para:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-2 opacity-80">
              <li>Verificar y garantizar la identidad inequívoca del votante.</li>
              <li>Permitir y fiscalizar el acceso seguro a los comicios habilitados.</li>
              <li>Asegurar computacional y criptográficamente que cada usuario emita un único y definitivo voto.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">3. Confidencialidad y seguridad</h2>
            <p>
              UniBlock aplica avanzadas medidas técnicas, criptográficas y organizativas para proteger sus datos personales
              contra intrusiones, accesos no autorizados, pérdidas o divulgaciones deliberadas. El secreto de su 
              voto se mantiene inquebrantable desde la emisión hasta el almacenamiento gracias al uso de 
              <strong className="text-orange-500"> Smart Contracts</strong> auditables. Solo nuestro sistema algorítmico procesa e ingiere esta información.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">4. Conservación de los datos</h2>
            <p>
              Los datos se mantienen cifrados y se almacenan únicamente durante el tiempo estricto 
              y reglamentario para realizar el proceso de votación y validar universalmente los resultados. 
              Una vez concluido y cerrado este ciclo, su correlación de identidad queda completamente anonimizada del entorno blockchain.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">5. Derechos de los usuarios</h2>
            <p className="mb-3">
              Como ciudadano universitario del ecosistema, usted posee el irrenunciable derecho a:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-2 opacity-80">
              <li>Solicitar en cualquier minuto el acceso a su información personal.</li>
              <li>Exigir la rectificación algorítmica y eventual eliminación de sus datos sensibles.</li>
              <li>Retirar unilateralmente su consentimiento previo al proceso de sufragio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">6. Contacto e Incidencias</h2>
            <p>
              Para ejercer sus legítimos derechos corporativos o realizar consultas técnicas de privacidad de red, 
              le invitamos a contactar de inmediato con la mesa central, utilizando el sistema de soporte en plataforma.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PoliticasPrivacidad;
