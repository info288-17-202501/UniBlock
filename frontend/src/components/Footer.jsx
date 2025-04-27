import React from 'react';
import { HiOutlineShieldCheck, HiOutlineDocumentText } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-gray-800 py-8 px-4">
      <div className="flex flex-col items-center space-y-6">

        {/* Centro */}
        <div className="text-center">
          <p className="font-medium text-lg">&copy; {new Date().getFullYear()} UniBlock</p>
          <p className="text-sm">Todos los derechos reservados.</p>
        </div>

        {/* Lados */}
        <div className="flex justify-around w-full max-w-4xl text-sm">
          {/* Izquierda */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2">
              <HiOutlineShieldCheck className="text-xl" />
              <a href="#" className="hover:underline">Políticas de privacidad</a>
            </div>
          </div>

          {/* Derecha */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2">
              <HiOutlineDocumentText className="text-xl" />
              <a href="#" className="hover:underline">Términos y condiciones</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
