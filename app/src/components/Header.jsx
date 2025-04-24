import React from 'react';

const Header = () => {
	return (
		<header>
			<nav className="navbar">
				<div className="flex flex-row justify-around items-center lg:h-15">
					<a href="/" className="logo	">Votación Blockchain</a>
					<ul className="nav-links flex lg:flex-row lg:space-x-20">
						<li><a href="#acerca-de">acerca de</a></li>
						<li><a href="#como-votar">como votar</a></li>
						<li><a href="#preguntas-frecuentes">preguntas frecuentes</a></li>
						<li><a href="/login">Login</a></li>
					</ul>
				</div>
			</nav>
		</header>
	)
};

export default Header;