import React from 'react';

import Hero from "../components/Hero";
import AcercaDe from '@components/AcercaDe';
import ComoVotar from '@components/ComoVotar';
import ProximasVotaciones from '@components/ProximasVotaciones';
import Noticias from '@components/Noticias';
import PreguntasFrecuentes from '@components/PreguntasFrecuentes';
import Usuarios from '@components/Usuarios';


const Home = () => {
	return (
		<>
			<div className="home p-10 xl:p-20">
				<section id="hero">
					<Hero />
				</section>

				<section id='acerca-de' className="mt-24">
					<AcercaDe />
				</section>

				<section id='como-votar' className="mt-24">
					<ComoVotar />
				</section>

				<section id='proximas-votaciones' className="mt-24">
					<ProximasVotaciones />
				</section>

				<section id='noticias' className="mt-24">
					<Noticias />
				</section>

				<section id='preguntas-frecuentes' className="mt-24">
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