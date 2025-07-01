import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useVote from "../../Hooks/useVote";

const Votation = () => {
  const { votationId } = useParams();
  const navigate = useNavigate();
  const [votationData, setVotationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
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
          `http://localhost:3000/api/votations/get-votation/${votationId}`,
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
    if (submitSuccess) {
      setTimeout(() => navigate("/user/dashboard"), 3000);
    }
  }, [submitSuccess, navigate]);

  const handleCandidateSelect = (candidateId) => {
    setSelectedCandidate(candidateId);
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
      <div className="text-center py-20 text-red-500">
        Error: {error || submitError}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Volver al inicio
        </button>
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
    <div className="max-w-2xl mx-auto p-4 lg:pt-30">
      <h1 className="text-2xl text-[var(--color-text)] font-bold mb-4">
        {votationData.title}
      </h1>
      <p className="mb-6 text-[var(--color-text-secondary)]">
        {votationData.description}
      </p>

      <div className="mb-6">
        <h2 className="text-xl text-[var(--color-text)] font-semibold mb-2">
          Detalles de la votación:
        </h2>
        <p className="text-[var(--color-text)]">
          <strong>Fecha de cierre:</strong>{" "}
          {new Date(votationData.end_time).toLocaleString()}
        </p>
        <p className="text-[var(--color-text)]">
          <strong>Fecha de inicio:</strong>{" "}
          {new Date(votationData.start_time).toLocaleString()}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl text-[var(--color-text)] font-semibold mb-4">
          Candidatos:
        </h2>
        <div className="space-y-4">
          {votationData.candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`p-4 border text-[var(--color-text)] rounded-lg cursor-pointer transition-colors ${
                selectedCandidate === candidate.id
                  ? "bg-blue-100 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleCandidateSelect(candidate.id)}
            >
              <h3 className="font-medium">{candidate.name}</h3>
              <p className="text-sm text-gray-600">{candidate.email}</p>
            </div>
          ))}
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
