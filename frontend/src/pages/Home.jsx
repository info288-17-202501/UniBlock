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
				<Hero />
				<AcercaDe />
				<ComoVotar />
				<ProximasVotaciones />
				<Noticias />
				<PreguntasFrecuentes />
				<Usuarios />
			</div>
		</>
	);
};

export default Home;