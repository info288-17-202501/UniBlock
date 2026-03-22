import React, { useState, useEffect } from "react";
import { User, Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import useLogout from "../Hooks/useLogout";
import { useDarkMode } from "@context/darkModeContext";

const SECTIONS = [
  "acerca-de",
  "como-votar",
  "proximas-votaciones",
  "noticias",
  "planes",
  "preguntas-frecuentes",
  "usuarios",
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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
          const data = await res.json();
          setIsAuthenticated(data.authenticated);
          setUserData(data.user);
        } else {
          setIsAuthenticated(false);
          setUserData(null);
        }
      } catch (err) {
        console.error("Network or fetch error:", err);
        setIsAuthenticated(false);
        setUserData(null);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let current = "";

      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = section;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  if (location.pathname === "/auth") {
    return null;
  }

  const isHomePage = location.pathname === "/";

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setMenuOpen(false);
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <header>
      <nav className="navbar bg-[var(--color-background)]/95 backdrop-blur-md py-3 fixed w-full border-b border-[var(--navbar-border-color)] transition-all duration-300 ease z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center flex-1">
            {/* Logo */}
            <a href="/" className="logo shrink-0 mr-10">
              <img
                src="/logo.png"
                alt="Logo de la página"
                className="h-10 w-auto"
              />
            </a>

            {/* Menú de Navegación (Desktop) */}
            <div className="hidden lg:flex items-center flex-1">
              {isHomePage && (
                <ul className="flex items-center gap-2 list-none">
                  {SECTIONS.map((section) => (
                    <li key={section}>
                      <a
                        onClick={() => scrollToSection(section)}
                        className={`block py-1.5 px-3 text-[15px] cursor-pointer font-subtitle font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${
                          activeSection === section
                            ? "text-orange-600 bg-orange-500/10"
                            : "text-[var(--color-text)] hover:text-orange-600 hover:bg-orange-500/5"
                        }`}
                      >
                        {section
                          .replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Controles derecha Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Botón Ingresar / Salir */}
            <div>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="py-2 px-5 flex items-center justify-center cursor-pointer font-subtitle text-red-600 hover:bg-red-500/10 rounded-lg transition-all text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </button>
              ) : (
                <a
                  href="/auth"
                  className="py-2 px-5 flex items-center justify-center cursor-pointer font-subtitle bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all text-sm font-semibold shadow-sm hover:shadow-md"
                >
                  <User className="w-4 h-4 mr-2" />
                  Ingresar
                </a>
              )}
            </div>

            {/* Panel Admin */}
            {isAuthenticated && userData?.isAdmin && (
              <div>
                <a
                  href="/admin/dashboard"
                  className="py-2 px-5 flex items-center justify-center cursor-pointer font-subtitle bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all text-sm font-semibold"
                >
                  Panel Admin
                </a>
              </div>
            )}

            {/* Modo oscuro escritorio */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-background-secondary)] transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Botones móvil */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleDarkMode}
              className="text-[var(--color-text)] focus:outline-none p-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="text-[var(--color-text)] flex items-center p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[var(--color-background)] border-t border-[var(--border-color)] ${
            menuOpen ? "max-h-[100dvh] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="px-6 space-y-4">
            {isHomePage && (
              <ul className="space-y-1 list-none">
                {SECTIONS.map((section) => (
                  <li key={section}>
                    <a
                      onClick={() => scrollToSection(section)}
                      className={`block py-3 px-4 text-base cursor-pointer font-subtitle font-medium rounded-xl transition-all ${
                        activeSection === section
                          ? "text-orange-600 bg-orange-500/10"
                          : "text-[var(--color-text)] hover:text-orange-600 hover:bg-orange-500/5"
                      }`}
                    >
                      {section
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={logout}
                    className="w-full py-3 px-4 flex items-center justify-center font-subtitle text-red-600 bg-red-500/5 rounded-xl text-base font-semibold"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Cerrar Sesión
                  </button>
                  {userData?.isAdmin && (
                    <a
                      href="/admin/dashboard"
                      className="w-full py-3 px-4 flex items-center justify-center font-subtitle bg-purple-600 text-white rounded-xl text-base font-semibold"
                    >
                      Panel Admin
                    </a>
                  )}
                </>
              ) : (
                <a
                  href="/auth"
                  className="w-full py-3 px-4 flex items-center justify-center font-subtitle bg-orange-600 text-white rounded-xl text-base font-semibold shadow-md"
                >
                  <User className="w-5 h-5 mr-3" />
                  Ingresar a mi cuenta
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
