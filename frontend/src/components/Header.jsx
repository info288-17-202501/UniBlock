import React, { useState, useEffect } from 'react';
import { User, Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); 

  useEffect(() => {
    if(darkMode){
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Función para realizar el scroll con offset
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    window.scrollTo({
      top: element.offsetTop - 80, // Ajuste de offset según la altura del navbar
      behavior: 'smooth',
    });
  };

  return (
    <header>
      {/* Nav con borde y fondo blanco */}
      <nav className="navbar bg-[var(--color-background)] p-5 xl:px-20 xl:py-5 fixed w-full border-b-2 border-gray-300 transition-all duration-300 ease">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="logo">
            <img src="/logo.png" alt="Logo de la página" className="h-10 w-auto" />
          </a>

          {/* Menú hamburguesa (solo en móvil) */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menú de navegación */}
          <ul
            className={`flex flex-col lg:flex-row lg:space-x-10 absolute lg:static top-16 left-0 w-full lg:w-auto bg-[var(--color-background)] text-[var(--color-text)] lg:bg-transparent transition-all duration-300 ease ${
              menuOpen ? 'block' : 'hidden'
            } lg:flex`}
          >
            <li className="py-2 lg:py-0 text-center">
              <a onClick={() => scrollToSection('acerca-de')} className="cursor-pointer hover:text-gray-700">
                Acerca de
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center">
              <a onClick={() => scrollToSection('como-votar')} className="cursor-pointer hover:text-gray-700">
                Cómo votar
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center">
              <a onClick={() => scrollToSection('proximas-votaciones')} className="cursor-pointer hover:text-gray-700">
                Próximas votaciones
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center">
              <a onClick={() => scrollToSection('noticias')} className="cursor-pointer hover:text-gray-700">
                Noticias
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center">
              <a onClick={() => scrollToSection('preguntas-frecuentes')} className="cursor-pointer hover:text-gray-700">
                Preguntas frecuentes
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center">
              <a onClick={() => scrollToSection('usuarios')} className="cursor-pointer hover:text-gray-700">
                Usuarios
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center">
              <a href="/auth" className="flex items-center justify-center cursor-pointer hover:text-gray-700">
                <User className="w-6 h-6" />
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center">
              <button onClick={toggleDarkMode} className="flex w-full items-center justify-center cursor-pointer hover:text-gray-700">
                {darkMode ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
