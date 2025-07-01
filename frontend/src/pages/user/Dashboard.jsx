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
        const response = await fetch('http://localhost:3000/api/votations/get-votations', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Error al obtener las votaciones');
        }

        const { votations } = await response.json();
        console.log("Votations fetched:", votations);
        setVotations(votations);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotations();
  }, []);

  const handleVoteClick = (votationId) => {
    navigate(`/vote/${votationId}`);
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

      {/* Listado de todas las votaciones */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">Todas las votaciones</h2>

        {votations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {votations.map((votation) => {
              // Combina la fecha de inicio con la hora de inicio para crear un objeto Date válido
              const startDateTime = new Date(`${votation.start_date.split('T')[0]}T${votation.start_time}`);
              // Combina la fecha de fin con la hora de fin para crear un objeto Date válido
              const endDateTime = new Date(`${votation.end_date.split('T')[0]}T${votation.end_time}`);

              return (
                <div
                  key={votation.id}
                  onClick={() => handleVoteClick(votation.id)}
                  className="border border-[var(--button-border-color)] bg-[var(--button-background-color)] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-[var(--button-text-color)] mb-2">{votation.title}</h3>
                  <p className="text-[var(--button-text-color-secondary)] mb-4 line-clamp-2">{votation.description}</p>
                  <div className="flex justify-between">
                    <span className="text-[var(--button-text-color-secondary)]"><strong>Inicia:</strong> {new Date(votation.start_date).toLocaleDateString()}</span>
                    <span className="text-[var(--button-text-color-secondary)]">
                      {startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                    <span className="text-[var(--button-text-color-secondary)]"><strong>Finaliza:</strong> {new Date(votation.end_date).toLocaleDateString()}</span>
                    <span className="text-[var(--button-text-color-secondary)]" >
                      {endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                  </div>
                  <div className="mt-2 text-sm space-x-2">
                    <span className={`px-2 py-1 rounded ${new Date(votation.end_date) < new Date() ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-700'}`}>
                      {new Date(votation.end_date) < new Date() ? 'Finalizada' : 'Activa'}
                    </span>
                    <span className={`px-2 py-1 rounded ${votation.public ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {votation.public ? 'Pública' : 'Privada'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-[var(--color-text-secondary)]">No hay votaciones disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;