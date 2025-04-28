import React from 'react';
import { HiOutlineShieldCheck, HiOutlineDocumentText } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="border-y text-gray-800 py-8 px-4">
    
      <div className="flex flex-col items-center space-y-6">

        {/* Centro */}
        <div className="text-center">
          <p className="font-medium text-[var(--color-text)] text-lg">&copy; {new Date().getFullYear()} UniBlock</p>
          <p className="text-sm text-[var(--color-text)]">Todos los derechos reservados.</p>
        </div>

        {/* Lados */}
        <div className="flex justify-around w-full max-w-4xl text-sm">
          {/* Izquierda */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2 text-[var(--color-text)]">
              <HiOutlineShieldCheck className="text-xl" />
              <a href="#" className="hover:underline text-[var(--color-text)]">Políticas de privacidad</a>
            </div>
          </div>

          {/* Derecha */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2 text-[var(--color-text)]">
              <HiOutlineDocumentText className="text-xl text-[var(--color-text)]" />
              <a href="#" className="hover:underline">Términos y condiciones</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
