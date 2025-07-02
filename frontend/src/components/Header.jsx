import React, { useState, useEffect } from "react";
import { User, Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import useLogout from "../Hooks/useLogout";
import { useDarkMode } from "@context/darkModeContext"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [userData, setUserData] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { darkMode, setDarkMode } = useDarkMode();
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const location = useLocation();
  const { logout } = useLogout();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost/api/auth/check", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json(); // Parse the JSON response
          setIsAuthenticated(data.authenticated); // This will be true
          setUserData(data.user); // Store the user object
        } else {
          // Handle cases where res.ok is false (e.g., 401, 500)
          setIsAuthenticated(false);
          setUserData(null);
          // Optionally, you could parse the error message if your backend sends it
          // const errorData = await res.json();
          // console.error("Authentication error:", errorData.message);
        }
      } catch (err) {
        console.error("Network or fetch error:", err);
        setIsAuthenticated(false);
        setUserData(null);
      }
    };
    checkAuth();
  }, []); // Empty dependency array means this runs once on component mount

  if (location.pathname === "/auth") {
    return null;
  }

  const isHomePage = location.pathname === "/";

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setMenuOpen(false); // cerrar menú después de click
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header>
      <nav className="navbar bg-[var(--color-background)] py-5 px-5 xl:px-20 fixed w-full border-b-2 border-[var(--navbar-border-color)] transition-all duration-300 ease z-50">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="logo">
            <img
              src="/logo.png"
              alt="Logo de la página"
              className="h-10 w-auto"
            />
          </a>

          {/* Botones a la derecha */}
          <div className="flex items-center gap-6">
            {/* Modo oscuro (solo en móvil) */}
            <button
              onClick={toggleDarkMode}
              className="text-[var(--color-text)] focus:outline-none lg:hidden"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>

            {/* Menú hamburguesa */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-[var(--color-text)] flex items-center"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Menú de navegación */}
          <ul
            className={`flex flex-col transition-all h-[100dvh] lg:px-5
            lg:flex-row lg:space-x-8 absolute lg:static top-20 left-0 
            overflow-hidden bg-[var(--color-background)] text-[var(--color-text)] 
            lg:bg-transparent lg:h-auto
            ${menuOpen ? "w-full" : "w-0"}
            lg:w-auto`}
          >
            {isHomePage && (
              <>
                {[
                  "acerca-de",
                  "como-votar",
                  "proximas-votaciones",
                  "noticias",
                  "preguntas-frecuentes",
                  "usuarios",
                ].map((section) => (
                  <li
                    key={section}
                    className="text-center hover:scale-110 transition-transform duration-200"
                  >
                    <a
                      onClick={() => scrollToSection(section)}
                      className="block py-2 cursor-pointer font-subtitle"
                    >
                      {section
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </a>
                  </li>
                ))}
              </>
            )}

            {/* Autenticación */}
            <li className="hover:scale-110 transition-transform duration-200">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="py-2 flex items-center w-full justify-center cursor-pointer font-subtitle"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="ml-2">Salir</span>
                </button>
              ) : (
                <a
                  href="/auth"
                  className="block py-2 flex items-center justify-center cursor-pointer font-subtitle"
                >
                  <User className="w-6 h-6" />
                </a>
              )}
            </li>

            {/* Si es admin boton para /admin/dashboard*/}
            {isAuthenticated && userData?.isAdmin && (
              <li className="hover:scale-110 transition-transform duration-200">
                <a
                  href="/admin/dashboard"
                  className="block py-2 flex items-center justify-center cursor-pointer font-subtitle"
                >
                  <span className="mr-2">Ir a panel administrador</span>
                </a>
              </li>
            )}


            {/* Botón de modo oscuro (en escritorio) */}
            <li className="hidden lg:block hover:scale-110 transition-transform duration-200">
              <button
                onClick={toggleDarkMode}
                className="flex w-full h-full items-center justify-center cursor-pointer"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
