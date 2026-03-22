import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi"; // <-- Agregamos el ícono de contacto (mail)
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-b border-[var(--color-border)] text-[var(--color-text)] py-8 px-4">
      <div className="flex flex-col items-center space-y-6">
        {/* Centro */}
        <div className="text-center">
          <p className="font-medium text-[var(--color-text)] text-lg">
            &copy; {new Date().getFullYear()} UniBlock
          </p>
          <p className="text-sm text-[var(--color-text)] opacity-70">
            Nacido en 2025 como un proyecto universitario.
          </p>
          <p className="text-sm text-[var(--color-text)]">
            Todos los derechos reservados.
          </p>
        </div>

        {/* Lados */}
        <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl text-sm space-y-4 md:space-y-0">
          {/* Izquierda */}
          <div className="flex items-center gap-2 text-[var(--color-text)] group">
            <HiOutlineShieldCheck className="text-xl group-hover:text-orange-500 transition-colors" />
            <Link to="/privacidad" className="hover:text-orange-500 hover:underline text-[var(--color-text)] transition-colors">
              Políticas de privacidad
            </Link>
          </div>

          {/* Centro */}
          <div className="flex items-center gap-2 text-[var(--color-text)] group">
            <HiOutlineDocumentText className="text-xl group-hover:text-orange-500 transition-colors" />
            <Link to="/terminos-condiciones" className="hover:text-orange-500 hover:underline text-[var(--color-text)] transition-colors">
              Términos y condiciones
            </Link>
          </div>

          {/* Derecha */}
          <div className="flex items-center gap-2 text-[var(--color-text)] group">
            <HiOutlineUserGroup className="text-xl group-hover:text-orange-500 transition-colors" />
            <Link to="/nosotros" className="hover:text-orange-500 hover:underline text-[var(--color-text)] transition-colors">
              Nosotros
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
