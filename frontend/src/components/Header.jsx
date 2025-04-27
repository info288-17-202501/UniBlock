import React, { useState, useEffect } from 'react';
import { User, Menu, X, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import useLogout from '../Hooks/useLogout';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const location = useLocation();
  const { logout } = useLogout();


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/auth/check', {
          credentials: 'include',
        });
        setIsAuthenticated(res.ok); 
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // No mostrar header en la página de auth
  if (location.pathname === '/auth') {
    return null;
  }

  const isHomePage = location.pathname === '/';

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header>
      <nav className="navbar bg-white p-5 xl:px-20 xl:py-5 fixed z-50 w-full border-b-2 border-gray-300">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="logo">
            <img src="/logo.png" alt="Logo de la página" className="h-10 w-auto" />
          </a>

          {(isHomePage || menuOpen) && (
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 focus:outline-none"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}

          {(isHomePage || menuOpen) && (
            <ul
              className={`flex flex-col lg:flex-row lg:space-x-10 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent transition-all duration-300 ease-in-out ${
                menuOpen ? 'block' : 'hidden'
              } lg:flex`}
            >
              {/* Menú Home */}
              {isHomePage && (
                <>
                  <li className="py-2 lg:py-0 text-center"><a onClick={() => scrollToSection('acerca-de')} className="cursor-pointer hover:text-gray-700">Acerca de</a></li>
                  <li className="py-2 lg:py-0 text-center"><a onClick={() => scrollToSection('como-votar')} className="cursor-pointer hover:text-gray-700">Cómo votar</a></li>
                  <li className="py-2 lg:py-0 text-center"><a onClick={() => scrollToSection('proximas-votaciones')} className="cursor-pointer hover:text-gray-700">Próximas votaciones</a></li>
                  <li className="py-2 lg:py-0 text-center"><a onClick={() => scrollToSection('noticias')} className="cursor-pointer hover:text-gray-700">Noticias</a></li>
                  <li className="py-2 lg:py-0 text-center"><a onClick={() => scrollToSection('preguntas-frecuentes')} className="cursor-pointer hover:text-gray-700">Preguntas frecuentes</a></li>
                  <li className="py-2 lg:py-0 text-center"><a onClick={() => scrollToSection('usuarios')} className="cursor-pointer hover:text-gray-700">Usuarios</a></li>
                </>
              )}
              
              {/* Ícono de usuario o botón de logout */}
              <li className="py-2 lg:py-0 text-center">
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="flex items-center justify-center cursor-pointer hover:text-gray-700"
                  >
                    <LogOut className="w-6 h-6" />
                    <span className="ml-2">Salir</span>
                  </button>
                ) : (
                  <a href="/auth" className="flex items-center justify-center cursor-pointer hover:text-gray-700">
                    <User className="w-6 h-6" />
                  </a>
                )}
              </li>
            </ul>
          )}

          {/* Desktop view */}
          {!isHomePage && (
            <div className="hidden lg:block">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="flex items-center justify-center cursor-pointer hover:text-gray-700"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="ml-2">Salir</span>
                </button>
              ) : (
                <a href="/auth" className="flex items-center justify-center cursor-pointer hover:text-gray-700">
                  <User className="w-6 h-6" />
                </a>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;