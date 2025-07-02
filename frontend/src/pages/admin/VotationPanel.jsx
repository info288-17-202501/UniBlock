import React, { useEffect, useState } from "react";

const VotationPanel = () => {
  const [votations, setVotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVotations = async () => {
    try {
      const res = await fetch(
        "http://localhost/api/votations/votation-by-user",
        {
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Error fetching votations");
      const data = await res.json();
      setVotations(data.votations); // EXTRAER ARRAY
    } catch (error) {
      console.error("Error fetching votations", error);
      setError("Error al cargar las votaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotations();
  }, []);

  const handleEndVotation = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/vote/send-votes/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setVotations((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: "Terminado" } : v))
      );
    } catch (error) {
      alert("No se pudo terminar la votación.");
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold">
        Cargando votaciones...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 xl:pt-30">
      <h2 className="text-3xl font-bold mb-6 text-center">Mis Votaciones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left">Título</th>
              <th className="py-3 px-4 border-b text-left">Inicio</th>
              <th className="py-3 px-4 border-b text-left">Término</th>
              <th className="py-3 px-4 border-b text-left">Estado</th>
              <th className="py-3 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {votations.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 px-4 text-center text-gray-500">
                  No tienes votaciones creadas.
                </td>
              </tr>
            ) : (
              votations.map((votation) => (
                <tr key={votation.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{votation.title}</td>
                  <td className="py-3 px-4 border-b">
                    {votation.start_date
                      ? new Date(votation.start_date).toLocaleString()
                      : "-"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {votation.end_date
                      ? new Date(votation.end_date).toLocaleString()
                      : "-"}
                  </td>
                  <td className="py-3 px-4 border-b capitalize">
                    {votation.status}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {votation.status !== "Terminado" && (
                      <button
                        onClick={() => handleEndVotation(votation.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                      >
                        Terminar Votación
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VotationPanel;
