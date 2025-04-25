import React from 'react';
import { User } from 'lucide-react';


const Header = () => {
	return (
		<header>
			<nav className="navbar">
				<div className="flex flex-row justify-around items-center lg:h-15">
					<a href="/" className="logo	"><img src="/logo.png" alt="Logo de la página" className="h-10 w-auto" /></a>
					<ul className="nav-links flex lg:flex-row lg:space-x-20">
						<li><a href="#acerca-de">Acerca de</a></li>
						<li><a href="#como-votar">Cómo votar</a></li>
						<li><a href="#noticias">Noticias</a></li>
						<li><a href="#preguntas-frecuentes">Preguntas frecuentes</a></li>
						<li><a href="/login" className="flex items-center justify-center"><User className="w-6 h-6 align-middle" /></a></li>
					</ul>
				</div>
			</nav>
		</header>
	)
};

export default Header;