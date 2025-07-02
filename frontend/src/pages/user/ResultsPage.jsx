import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [votation, setVotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVotation = async () => {
      try {
        const response = await fetch(
          `http://localhost/api/votations/results/${id}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener la votación");
        }

        const { votation } = await response.json();
        
        setVotation(votation);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVotation();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold">
        Cargando resultados...
      </div>
    );
  }

  if (error || !votation) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>{error || "No se pudo cargar la votación."}</p>
        <button
          onClick={() => navigate("/user/dashboard")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Volver al Panel
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 justify-center xl:pt-30">
      <h1 className="text-3xl font-bold mb-4">{votation.title}</h1>
      <p className="text-gray-700 mb-6">{votation.description}</p>

      <div className="mb-6">
        <p>
          <strong>Inicio:</strong>{" "}
          {new Date(votation.start_date).toLocaleDateString()}{" "}
          {votation.start_time?.slice(0, 5)}
        </p>
        <p>
          <strong>Finalizó:</strong>{" "}
          {new Date(votation.end_date).toLocaleDateString()}{" "}
          {votation.end_time?.slice(0, 5)}
        </p>
        <p>
          <strong>Estado:</strong> {votation.status}
        </p>
        <p>
          <strong>Tipo:</strong> {votation.public ? "Pública" : "Privada"}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Resultados:</h2>
      {votation.candidates?.length > 0 ? (
        <ul className="space-y-3">
          {votation.candidates.map((candidate) => (
            <li
              key={candidate.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded"
            >
              <span className="font-medium">{candidate.name}</span>
              <span className="text-lg font-bold text-blue-700">
                {candidate.number_of_votes} votos
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay candidatos registrados.</p>
      )}

      <button
        onClick={() => navigate("/user/dashboard")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Volver al Panel
      </button>
    </div>
  );
};

export default ResultsPage;
