import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("http://localhost/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        navigate("/user/dashboard"); 
        window.location.reload();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error en la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, message };
};

export default useLogin;
