import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useVote from "../../Hooks/useVote";
import profile1 from "@assets/profile1.jpg"; // Asegúrate de que la ruta sea correcta
import profile2 from "@assets/profile2.jpg"; // Asegúrate de que la ruta

const Votation = () => {
  const { votationId } = useParams();
  const navigate = useNavigate();
  const [votationData, setVotationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  // Eliminamos el estado voterEmail

  const {
    sendVote,
    loading: submitting,
    error: submitError,
    success: submitSuccess,
  } = useVote();

  useEffect(() => {
    const fetchVotationData = async () => {
      try {
        const response = await fetch(
          `http://localhost/api/votations/get-votation/${votationId}`,
          {
            credentials: "include", // Asegúrate de incluir las cookies
          }
        );
        if (!response.ok) {
          // Si la respuesta NO es exitosa (ej. 403 Forbidden)
          const errorData = await response.json(); // Intenta leer el cuerpo JSON del error
          // Asigna el mensaje de error para mostrarlo en el UI
          throw new Error(
            errorData.message ||
              `Error al obtener la votación: ${response.statusText}`
          );
        }
        const data = await response.json();
        setVotationData(data.votation);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVotationData();
  }, [votationId]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1200) {
          setItemsPerPage(3);
        } else if (window.innerWidth >= 768) {
          setItemsPerPage(2);
        } else {
          setItemsPerPage(1);
        }
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    if (submitSuccess) {
      setTimeout(() => navigate("/user/dashboard"), 3000);
    }
  }, [submitSuccess, navigate]);

  const handleCandidateSelect = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  const nextSlide = () => {
    if (votationData?.candidates) {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % votationData.candidates.length
      );
    }
  };

  const prevSlide = () => {
    if (votationData?.candidates) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? votationData.candidates.length - 1 : prevIndex - 1
      );
    }
  };

  const getVisibleCandidates = () => {
    if (!votationData?.candidates) return [];
    const candidates = votationData.candidates;

    // Si hay menos candidatos que itemsPerPage, devolver todos los candidatos
    if (candidates.length <= itemsPerPage) {
      return candidates;
    }

    const visible = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentIndex + i) % candidates.length;
      visible.push(candidates[index]);
    }

    return visible;
  };

  const handleSubmitVote = async () => {
    if (!selectedCandidate) {
      alert("Por favor selecciona un candidato antes de votar");
      return;
    }

    sendVote({
      votationId: votationId, // ¡CAMBIO AQUÍ! Pasa votationId directamente
      candidateId: selectedCandidate,
      // El email ya NO se pasa aquí
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  if (error || submitError) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 ">
        <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-6 max-w-xl w-full text-center shadow-md">
          <div className="flex flex-col items-center space-y-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
              />
            </svg>
            <h2 className="text-2xl font-semibold">¡Ocurrió un error!</h2>
            <p className="text-sm sm:text-base">{error || submitError}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          ¡Voto registrado con éxito!
        </h2>
        <p>Gracias por participar en esta votación.</p>
      </div>
    );
  }

  return (
    <div className="max-w lg:mx-20 p-4 pt-30">
      <h1 className="text-5xl text-[var(--color-text)] font-title font-bold mb-4">
        {votationData.title}
      </h1>
      <p className="mb-6 text-[var(--color-text-secondary)]">
        {votationData.description}
      </p>

      <div className="mb-6">
        <h2 className="text-xl text-[var(--color-text)] font-title font-semibold mb-2">
          Detalles de la votación:
        </h2>
        <p className="text-[var(--color-text)]">
          <strong>Fecha de cierre:</strong>{" "}
          {new Date(votationData.end_date).toLocaleDateString()}{" "}
        </p>
        <p className="text-[var(--color-text)]">
          <strong>Fecha de inicio:</strong>{" "}
          {new Date(votationData.start_date).toLocaleDateString()}{" "}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl text-[var(--color-text)] font-title font-semibold mb-4">
          Candidatos:
        </h2>

        <div className="relative px-4 sm:px-8 md:px-12 xl:px-16">
          {/* Botón izquierdo */}
          {votationData?.candidates?.length > itemsPerPage && (
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Grid de candidatos */}
          <div className="grid [grid-template-columns:repeat(auto-fit,_minmax(0,_300px))] gap-8 justify-center ">
            {getVisibleCandidates().map((candidate, index) => (
              <div
                key={`${candidate.id}-${currentIndex}-${index}`}
                className={`min-w-[280px] max-w-[380px] w-full rounded-xl overflow-hidden shadow-lg text-white transition transform hover:scale-[1.02] duration-200 ${
                  selectedCandidate === candidate.id
                    ? "ring-4 ring-orange-400"
                    : ""
                }`}
                style={{ backgroundColor: "#2b2b2b" }}
              >
                {/* ...existing code... */}
                {/* Parte superior naranja */}
                <div className="bg-orange-600 h-24 relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-10">
                    <div
                      className="absolute bg-orange-600 rounded-full z-0"
                      style={{
                        top: "-4px",
                        left: "-4px",
                        width: "calc(100% + 8px)",
                        height: "calc(100% + 8px)",
                      }}
                    ></div>

                    <img
                      src={candidate.imageUrl || profile1}
                      alt={candidate.name}
                      className="w-24 h-24 rounded-full border-4 border-white object-cover relative z-10"
                    />
                  </div>
                </div>

                {/* Parte inferior con nombre y botón */}
                <div className="pt-12 pb-6 text-center px-4 min-h-[120px] flex flex-col justify-between">
                  <div className="flex-grow flex flex-col justify-center">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-tight sm:min-h-[1.75rem] md:min-h-[2rem] lg:min-h-[2.5rem]">
                      {candidate.name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 italic leading-relaxed flex items-center justify-center">
                      {candidate.degree ||
                        "Ingeniería civil informática – 4to año"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCandidateSelect(candidate.id)}
                    className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-full cursor-pointer text-sm sm:text-base transition-all duration-200 w-[200px] self-center"
                  >
                    Seleccionar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Botón derecho */}
          {votationData?.candidates?.length > itemsPerPage && (
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Indicadores de puntos */}
          {votationData?.candidates?.length > itemsPerPage && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({
                length: Math.ceil(
                  votationData.candidates.length / itemsPerPage
                ),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerPage)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    Math.floor(currentIndex / itemsPerPage) === index
                      ? "bg-orange-600"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Se elimina el input de correo electrónico */}

      <div className="flex justify-end">
        <button
          onClick={handleSubmitVote}
          disabled={submitting || !selectedCandidate} // Se eliminó la dependencia de voterEmail
          className={`px-6 py-2 rounded-md text-white ${
            submitting || !selectedCandidate
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {submitting ? "Enviando voto..." : "Confirmar voto"}
        </button>
      </div>
    </div>
  );
};

export default Votation;
