import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<header>
			<nav className="navbar bg-white p-5 xl:px-20 xl:py-5 fixed w-full">
				<div className="flex items-center justify-between">
					<a href="/" className="logo">
						<img src="/logo.png" alt="Logo de la página" className="h-10 w-auto" />
					</a>

					{/* Botón de menú hamburguesa (solo visible en móviles) */}
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
					<ul className={`flex flex-col lg:flex-row lg:space-x-10 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'} lg:flex`}>
						<li className="py-2 lg:py-0 text-center"><a href="#acerca-de">Acerca de</a></li>
						<li className="py-2 lg:py-0 text-center"><a href="#como-votar">Cómo votar</a></li>
						<li className="py-2 lg:py-0 text-center"><a href="#noticias">Noticias</a></li>
						<li className="py-2 lg:py-0 text-center"><a href="#preguntas-frecuentes">Preguntas frecuentes</a></li>
						<li className="py-2 lg:py-0 text-center">
							<a href="/login" className="flex items-center justify-center">
								<User className="w-6 h-6" />
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
