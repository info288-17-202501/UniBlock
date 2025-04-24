import React from 'react';
import Header from '@components/Header';

const Home = () => {
	return (
		<>
			<Header />
			<div className="home lg:p-10">
				<section className='hero lg:h-[90vh] flex items-center'>
					<div className=''>
						<h1 className='lg:text-5xl'>Sistema de Votación Blockchain</h1>
						<p>Bienvenido al sistema de votación basado en blockchain. Aquí puedes participar en elecciones de manera segura y transparente.</p>
						<div className='lg:py-10'>
							<a href="/votar" className="btn border-1 rounded-xl px-6 py-3 ">Votar</a>
						</div>
					</div>
				</section>
				
				<section id='acerca-de'>
					<h1>acerca de</h1>
				</section>

				<section id='como-votar'>
					<h1>como votar</h1>
				</section>

				<section id='preguntas-frecuentes'>
					<h1>preguntas frecuentes</h1>
				</section>
			</div>
		</>
	);
};

export default Home;