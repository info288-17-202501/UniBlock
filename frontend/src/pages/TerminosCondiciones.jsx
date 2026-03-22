import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TerminosCondiciones = () => {
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
        <h1 className="text-4xl font-extrabold mb-8 text-orange-600 border-b pb-6 border-[var(--border-color)]">Términos y Condiciones</h1>

        <div className="space-y-8 text-lg opacity-90 leading-relaxed">
          <p>
            Bienvenido al sistema de votación universitaria <strong>UniBlock</strong>, una plataforma
            vanguardista basada en tecnología blockchain inmutable, orientada rigurosamente a garantizar 
            procesos electorales totalmente transparentes, democráticos, seguros y confiables en su estructura.
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">1. Aceptación Universal de los términos</h2>
            <p>
              Al formalizar la entrada, acceder y dar uso interactivo a esta plataforma web3, usted reconoce haber leído,
              entendido y aceptado incondicionalmente estos Términos y Condiciones.
              Si diverge o no está de acuerdo con cualquier cláusula legal, debe detener inmediatamente su uso del sistema.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">2. Uso Autorizado y Restringido de la plataforma</h2>
            <p>
              El motor de votación se destina de manera exclusiva a estudiantes matriculados, funcionarios validados 
              y entidades de administración autorizadas activamente por la universidad para concurrir en los dictámenes 
              oficiales y constitucionales. Todo usuario queda sujeto a un código de ética para no evadir ni saturar
              intencionalmente la carga operativa del sistema.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">3. Seguridad, Criptografía y Tecnología Blockchain</h2>
            <div className="bg-orange-500/10 p-6 rounded-xl border border-orange-500/20">
              <p>
                La trazabilidad e integridad de los votos están regidas soberanamente mediante la implementación de 
                computación criptográfica usando Smart Contracts.
                <strong> Cada voto es un bloque inalterable.</strong> Tras su emisión, la red descentralizada encripta
                la acción y elimina de manera definitiva toda capacidad subyacente de modificar, suplantar o auditar la
                asociación identitaria del emisor a la del sufragio final. 
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">4. Resguardo de la Privacidad de los Usuarios</h2>
            <p>
              Para operar este instrumento civil en red, UniBlock retendrá de manera limitada los insumos de 
              certificación individual necesarios para verificar de manera binaria la pertenencia institucional. 
              Dichos metadatos jamás serán comerciados a ecosistemas privados ni indexados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">5. Limitación Algorítmica de Responsabilidad</h2>
            <p>
              El equipo gestor y su servidor de autenticación (UniBlock) no podrá atribuirse responsabilidades legales
              frente a brechas resultantes de malas praxis en el ámbito del usuario final; tales como difusión de claves web,
              sesiones abiertas inadvertidamente en laboratorios, o intercepciones de phishing externos. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">6. Actualizaciones y Modificaciones Unilaterales</h2>
            <p>
              El comité de administración retiene el control de revisión, mutación e inducción de cambios temporales a la 
              malla de estos términos de servicio. Cualquier alteración a las directrices de flujo fundamental se notificará 
              vía dashboard y su uso subsiguiente establecerá conformidad tácita y explícita.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TerminosCondiciones;
