import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/recover-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage('📧 Si el email existe, se ha enviado un enlace para restablecer la contraseña.');
      } else {
        setMessage(data.message || 'Error al solicitar restablecimiento de contraseña.');
      }
    } catch (error) {
      setLoading(false);
      setMessage('❌ Error de conexión con el servidor.');
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
          Recuperar Contraseña
        </h2>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-center text-sm font-medium ${
            message.includes('📧') 
              ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20' 
              : 'bg-red-500/10 text-red-600 border border-red-500/20'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[var(--color-text)] opacity-70 ml-1">
              Tu Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="ejemplo@correo.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 bg-[var(--color-background)] border border-[var(--border-color)] rounded-2xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all duration-300 shadow-lg shadow-orange-600/20 disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </button>
        </form>
      </div>
    </div>
  );
}
