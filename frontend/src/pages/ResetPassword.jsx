import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const tokenFromURL = searchParams.get('token');
    if (tokenFromURL) {
      setToken(tokenFromURL);
    } else {
      setMessage('Token no válido o no proporcionado.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('http://localhost/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Contraseña actualizada correctamente. Ya puedes iniciar sesión.');
      } else {
        setMessage(data.message || '❌ Error al actualizar la contraseña.');
      }
    } catch (error) {
      setMessage('❌ Ocurrió un error al conectar con el servidor.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4 sm:p-6 overflow-hidden relative">
      <div className="bg-[var(--color-background-secondary)] p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-[var(--border-color)] relative z-10">
        <Link 
          to="/auth" 
          className="absolute top-6 left-6 sm:top-8 sm:left-8 text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2 font-semibold text-xs sm:text-sm group"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
          Volver
        </Link>

        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-[var(--color-text)] pt-6 sm:pt-4">
          Nueva Contraseña
        </h2>
        
        {message && (
          <div className={`mb-6 p-4 rounded-xl text-center text-sm font-medium ${
            message.includes('✅') 
              ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
              : 'bg-red-500/10 text-red-600 border border-red-500/20'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[var(--color-text)] opacity-70 ml-1">
              Nueva Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 bg-[var(--color-background)] border border-[var(--border-color)] rounded-2xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[var(--color-text)] opacity-70 ml-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-3 bg-[var(--color-background)] border border-[var(--border-color)] rounded-2xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all duration-300 shadow-lg shadow-orange-600/20 active:scale-[0.98]"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
