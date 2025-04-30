import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const authenticate = async (email, password, username, isLogin) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const response = await fetch(`http://localhost:3000/api/auth${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        console.log("Cookie set:", document.cookie);

        if (isLogin) {
          navigate('/admin/create-votation');
          window.location.reload(); 
        } else {
          navigate('/auth');
          window.location.reload();
        }
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
