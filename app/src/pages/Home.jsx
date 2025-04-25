import React from 'react';
import Header from '@components/Header';
import PreguntasFrecuentes from '@components/PreguntasFrecuentes';
import Noticias from '../components/Noticias';
import Usuarios from '../components/Usuarios';


const Home = () => {
	return (
		<>
			<Header />
			<div className="home p-10 xl:p-20">
				<section className='hero h-screen lg:h-[90vh] flex items-center'>
					<div>
						<h1 className='text-6xl xl:text-7xl'>UniBlock</h1>
						<p className='py-10 xl:max-w-150'>Bienvenido al sistema de votación basado en blockchain. Aquí puedes participar en elecciones de manera segura y transparente.</p>
						<div className='lg:py-10'>
							<a href="/login" className="btn border-1 rounded-xl px-6 py-3 ">Votar</a>
						</div>
					</div>
				</section>
				
				<section id='acerca-de'>
					<h1>Acerca de</h1>
				</section>

				<section id='como-votar' className='my-10 lg:py-30'>
					<h1>Cómo votar</h1>
						<div className='flex flex-col justify-center items-center lg:flex-row gap-10 xl:gap-40'>
						<div className='paso1 w-24 h-24  border-1 rounded-full p-10 flex items-center justify-center'>1</div>
						<div className='paso2 w-24 h-24  border-1 rounded-full p-10 flex items-center justify-center'>2</div>
						<div className='paso3 w-24 h-24  border-1 rounded-full p-10 flex items-center justify-center'>3</div>
					</div>
				</section>

				<section id='noticias'>
					<Noticias />
				</section>

				<section id='preguntas-frecuentes'>
					<PreguntasFrecuentes />
				</section>

				<section id='usuarios'>
					<Usuarios />
				</section>
			</div>
		</>
	);
};

export default Home;