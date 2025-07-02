import { useState } from 'react';

const useVote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendVote = async ({ votationId, candidateId }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost/api/vote/create-votation', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          votationId,
          candidateId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el voto');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return { sendVote, loading, error, success };
};

export default useVote;