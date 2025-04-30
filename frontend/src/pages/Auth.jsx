import React, { useState } from 'react';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [localError, setLocalError] = useState('');

  const { authenticate, loading, error, message } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!isLogin) {
      if (!formData.email.endsWith('@alumnos.uach.cl')) {
        setLocalError('Solo se permiten correos @uach.cl');
        return;
      }
      if (!otpVerified) {
        setLocalError('Debes verificar el código OTP antes de continuar.');
        return;
      }
    }

    authenticate(formData.email, formData.password, formData.username, isLogin);
  };

  const handleSendOtp = async () => {
    setLocalError('');
    if (!/@(?:.*\.)?uach\.cl$/.test(formData.email)) {
      setLocalError('Solo se permiten correos institucionales @uach.cl');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/auth/otp-send', { email: formData.email });
      setOtpSent(true);
    } catch (err) {
      setLocalError('Error al enviar el OTP. Intenta nuevamente.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/auth/otp-verify', {
        email: formData.email,
        otp,
      });
      setOtpVerified(true);
    } catch (err) {
      setLocalError('OTP inválido o expirado.');
    }
  };

  const handleGoBack = () => {
    window.location.reload();
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <button
        onClick={handleGoBack}
        className="absolute top-6 left-6 flex items-center space-x-1 py-2 px-4 rounded-md bg-white text-blue-600 hover:bg-blue-50 border border-blue-200 hover:border-blue-300 shadow-sm transition-all duration-200"
      >
        <span className="text-lg">←</span>
        <span className="font-medium">Volver</span>
      </button>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src="/logo.png" alt="Logo de la página" className="mx-auto h-16 w-auto" />
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          {isLogin ? 'Inicia sesión' : 'Crea una cuenta'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
              {!isLogin && !otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="mt-2 text-blue-600 hover:underline text-sm"
                >
                  Enviar OTP al correo
                </button>
              )}
            </div>

            {!isLogin && otpSent && !otpVerified && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Código OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="mt-2 text-blue-600 hover:underline text-sm"
                >
                  Verificar OTP
                </button>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            {localError && <p className="text-red-500 text-sm">{localError}</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 sm:text-sm"
              >
                {loading ? 'Procesando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
              </button>
            </div>
          </form>


          <div className="mt-6 text-center">
            <p className="text-sm">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setOtpSent(false);
                setOtpVerified(false);
                setOtp('');
                setLocalError('');
              }}
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </button>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
              </button>
            </div>


            {/* TODO ESTE DIV ES DEL BOTON DE MICROSOFT */}
            <div className = "mt-6">
              <button
                    onClick={() => {
                      const popup = window.open(
                        "http://localhost:3000/auth/microsoft",
                        "targetWindow",
                        `toolbar=no,
                        location=no,
                        status=no,
                        menubar=no,
                        scrollbars=yes,
                        resizable=yes,
                        width=620,
                        height=700`
                      );

                      window.addEventListener("message", (event) => {
                        if (event.origin === "http://localhost:3000") {
                          if (event.data) {
                            sessionStorage.setItem("user", JSON.stringify(event.data));
                            popup.close();
                          }
                        }
                      });
                    }}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                      alt="Microsoft logo"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="text-sm text-center leading-tight">
                      Continuar con cuenta<br />Microsoft UACh
                    </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
