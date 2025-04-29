import React, { useState, useEffect } from 'react';
import { User, Menu, X, Sun, Moon} from 'lucide-react';

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
    setMenuOpen(false); // Cerrar el menú al hacer scroll
    window.scrollTo({
      top: element.offsetTop - 80, // Ajuste de offset según la altura del navbar
      behavior: 'smooth',
    });
  };

  return (
    <header>
      {/* Nav con borde y fondo blanco */}
      <nav className="navbar bg-[var(--color-background)] p-5 xl:px-20 xl:py-5 fixed w-full border-b-2 border-[var(--navbar-border-color)] transition-transform-all duration-300 ease z-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="logo">
            <img src="/logo.png" alt="Logo de la página" className="h-10 w-auto" />
          </a>

          {/* Botones a la derecha */}
          <div className="flex items-center gap-6">
            {/* Botón modo oscuro (solo visible en móvil) */}
            <button
              onClick={toggleDarkMode}
              className="text-[var(--color-text)] focus:outline-none lg:hidden "
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            {/* Menú hamburguesa */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="focus:outline-none text-[var(--color-text)] flex items-center"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Menú de navegación */}
          <ul
            className={`flex flex-col transition-[width_400ms_ease-in-out,background-color_300ms_ease] h-[100dvh] 
              lg:flex-row lg:space-x-10 absolute lg:static top-20.5 left-0 
              overflow-hidden bg-[var(--color-background)] text-[var(--color-text)] 
              lg:bg-transparent lg:h-auto
              ${menuOpen ? 'w-full' : 'w-0'} 
              lg:w-auto lg:overflow-visible`}
          >
            <li className="py-2 lg:py-0 text-center hover:scale-[1.1] will-change-transform transition-transform duration-200">
              <a onClick={() => scrollToSection('acerca-de')} className="cursor-pointer font-subtitle">
                Acerca de
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center  hover:scale-[1.1] will-change-transform transition-transform duration-200">
              <a onClick={() => scrollToSection('como-votar')} className="cursor-pointer font-subtitle hover:text-[var(--color-text)] ">
                Cómo votar
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center  hover:scale-[1.1] will-change-transform transition-transform duration-200">
              <a onClick={() => scrollToSection('proximas-votaciones')} className="cursor-pointer font-subtitle hover:text-[var(--color-text)] ">
                Próximas votaciones
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center  hover:scale-[1.1] will-change-transform transition-transform duration-200">
              <a onClick={() => scrollToSection('noticias')} className="cursor-pointer font-subtitle hover:text-[var(--color-text)] ">
                Noticias
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center  hover:scale-[1.1] will-change-transform transition-transform duration-200">
              <a onClick={() => scrollToSection('preguntas-frecuentes')} className="cursor-pointer font-subtitle hover:text-[var(--color-text)] ">
                Preguntas frecuentes
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center  hover:scale-[1.1] will-change-transform transition-transform duration-200">
              <a onClick={() => scrollToSection('usuarios')} className="cursor-pointer font-subtitle hover:text-[var(--color-text)] ">
                Usuarios
              </a>
            </li>
            <li className="py-2 lg:py-0 text-center  hover:scale-[1.1] will-change-transform transition-transform duration-200">
              <a href="/auth" className="flex items-center justify-center cursor-pointer font-subtitle hover:text-[var(--color-text)] ">
                <User className="w-6 h-6" />
              </a>
            </li>
            {/*<li className="py-2 lg:py-0 text-center">
              <button onClick={toggleDarkMode} className="flex w-full items-center justify-center cursor-pointer font-subtitle hover:text-[var(--color-text)] ">
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon  className="w-6 h-6" />}
              </button>
            </li> */}
            
            {/* Botón modo oscuro (solo visible en PC) */}
            <li className="hidden lg:block  hover:scale-[1.1] will-change-transform transition-transform duration-200">
              <button
                onClick={toggleDarkMode}
                className="flex w-full items-center justify-center cursor-pointer hover:text-[var(--color-text)] " aria-label="Toggle dark mode">
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
