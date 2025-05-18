import React from "react";
import Hero from "../components/Hero";
import AcercaDe from "@components/AcercaDe";
import ComoVotar from "@components/ComoVotar";
import ProximasVotaciones from "@components/ProximasVotaciones";
import Noticias from "@components/Noticias";
import PreguntasFrecuentes from "@components/PreguntasFrecuentes";
import Usuarios from "@components/Usuarios";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="home px-10 xl:px-20 py-20 bg-[var(--color-background)] transition-all duration-300 ease">
        <Hero />
        <AcercaDe />
        <ComoVotar />
        <ProximasVotaciones />
        <Noticias />
        <PreguntasFrecuentes />
        <Usuarios />
      </div>
      <Footer />
    </>
  );
};

export default Home;
