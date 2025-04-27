import { useState } from 'react';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const authenticate = async (email, password, isLogin) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const endpoint = isLogin ? '/login' : '/register'; // Cambiar la URL dependiendo de login o registro
      const response = await fetch(`http://localhost:3001/api/auth${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Para enviar cookies
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        console.log("Cookie set:", document.cookie); // Verifica si la cookie se guardó
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return { authenticate, loading, error, message };
};

export default useAuth;
