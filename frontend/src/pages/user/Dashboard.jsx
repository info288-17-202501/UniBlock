import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [votations, setVotations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVotations = async () => {
      try {
        const response = await fetch('http://localhost/api/votations/get-votations', {
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Error al obtener las votaciones');

        const { votations } = await response.json();
        setVotations(votations);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotations();
  }, []);

  const handleVoteClick = (votation) => {
    if (votation.status === 'Activo') {
      navigate(`/vote/${votation.id}`);
    } else if (votation.status === 'Terminado') {
      navigate(`/results/${votation.id}`);
    } else if (votation.status === 'Pendiente') {
      alert('Esta votación está pendiente de confirmación. Por favor, vuelve más tarde.');
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-30 p-8">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">Panel de Usuario</h1>
      <p className="mb-8 text-[var(--color-text-secondary)]">
        Bienvenido a tu panel de usuario. Aquí puedes ver todas las votaciones disponibles.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">Todas las votaciones</h2>

        {votations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {votations.map((votation) => (
              <div
                key={votation.id}
                onClick={() => handleVoteClick(votation)}
                className={`border border-[var(--button-border-color)] bg-[var(--button-background-color)] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer`}
              >
                <h3 className="text-xl font-semibold text-[var(--button-text-color)] mb-2">
                  {votation.title}
                </h3>
                <p className="text-[var(--button-text-color-secondary)] mb-4 line-clamp-2">
                  {votation.description}
                </p>
                <div className="flex justify-between flex-wrap gap-1 text-sm">
                  <span className="text-[var(--button-text-color-secondary)]">
                    <strong>Inicia:</strong>{" "}
                    {new Date(votation.start_date).toLocaleDateString()}{" "}
                    {votation.start_time?.slice(0, 5)}
                  </span>
                  <span className="text-[var(--button-text-color-secondary)]">
                    <strong>Finaliza:</strong>{" "}
                    {new Date(votation.end_date).toLocaleDateString()}{" "}
                    {votation.end_time?.slice(0, 5)}
                  </span>
                </div>

                <div className="mt-2 text-sm space-x-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      votation.status === 'Terminado'
                        ? 'bg-gray-200 text-gray-700'
                        : votation.status === 'Pendiente'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {votation.status}
                  </span>

                  <span
                    className={`px-2 py-1 rounded ${
                      votation.public
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {votation.public ? 'Pública' : 'Privada'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-text-secondary)]">
            No hay votaciones disponibles en este momento.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
