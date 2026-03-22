import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Fingerprint } from "lucide-react";
import Turnstile from "react-turnstile";
import useLogin from "../Hooks/useLogin";
import useRegister from "../Hooks/useRegister";
import { useDarkMode } from "@context/darkModeContext";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
  const { darkMode } = useDarkMode();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", ""]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [localError, setLocalError] = useState("");

  const {
    login,
    loading: loginLoading,
    error: loginError,
    message: loginMessage,
  } = useLogin();
  const {
    register,
    loading: registerLoading,
    error: registerError,
    message: registerMessage,
  } = useRegister();

  const loading = isLogin ? loginLoading : registerLoading;
  const error = isLogin ? loginError : registerError;
  const message = isLogin ? loginMessage : registerMessage;

  const [isAdult, setIsAdult] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [otpSentMessage, setOtpSentMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!isLogin) {
      if (!formData.email.endsWith("@alumnos.uach.cl")) {
        setLocalError("Solo se permiten correos @alumnos.uach.cl");
        return;
      }
      if (!captchaToken) {
        setLocalError("Por favor, completa el captcha.");
        return;
      }
      if (!otpVerified) {
        setLocalError("Debes verificar el código OTP antes de continuar.");
        return;
      }
      if (!isAdult || !acceptPrivacy) {
        setLocalError(
          "Debes aceptar los términos y condiciones para continuar."
        );
        return;
      }
      await register(formData.email, formData.password, formData.username);
    } else {
      await login(formData.email, formData.password);
    }
  };

  const handleSendOtp = async () => {
    setLocalError("");
    if (!/@(?:.*\.)?uach\.cl$/.test(formData.email)) {
      setLocalError("Solo se permiten correos institucionales @uach.cl");
      return;
    }

    try {
      setOtpLoading(true);
      await axios.post("http://localhost/api/auth/otp-send", {
        email: formData.email,
      });
      setOtpSent(true);
      setOtpSentMessage(true);
    } catch (err) {
      setLocalError("Error al enviar el OTP. Intenta nuevamente.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost/api/auth/otp-verify",
        {
          email: formData.email,
          otp,
        }
      );
      setOtpVerified(true);
    } catch (err) {
      setLocalError("OTP inválido o expirado.");
    }
  };

  const handleKeyDownOtp = (e) => {
    if (e.key === "Enter") {
      handleVerifyOtp();
    }
  };

  const handleGoBack = () => {
    window.location.reload();
    window.history.back();
  };

  const handleMicrosoftLogin = () => {
    const width = 620;
    const height = 700;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      "http://localhost:3000/auth/microsoft",
      "targetWindow",
      `toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    const receiveMessage = (event) => {
      if (event.origin === "http://localhost:3000" && event.data) {
        sessionStorage.setItem("user", JSON.stringify(event.data));
        popup?.close();
        window.removeEventListener("message", receiveMessage);
        window.location.href = "/user/dashboard";
      }
    };

    window.addEventListener("message", receiveMessage);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      {/* Elementos decorativos de fondo abstractos */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Botón Volver Mejorado */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 py-2 px-4 sm:py-2.5 sm:px-5 rounded-full bg-[var(--color-background-secondary)] text-[var(--color-text)] hover:bg-orange-500/10 hover:text-orange-500 border border-[var(--border-color)] hover:border-orange-500/50 shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-xs sm:text-sm">Volver</span>
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <img
          src="/logo.png"
          alt="Logo de la página"
          className="mx-auto h-16 w-auto drop-shadow-lg"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--color-text)] font-title">
          {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta segura"}
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--color-text)] opacity-70">
          {isLogin ? "Ingresa tus credenciales para acceder a la plataforma web3." : "Regístrate para participar en votaciones blockchain."}
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-[var(--color-background-secondary)] py-8 px-6 shadow-2xl sm:rounded-3xl sm:px-10 border border-[var(--border-color)] backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="username" className="block text-sm font-semibold text-[var(--color-text)] mb-1">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      placeholder="Juan Pérez"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2.5 text-[var(--color-text)] bg-[var(--color-background)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all sm:text-sm shadow-inner"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-text)] mb-1">
                Correo institucional
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ejemplo@alumnos.uach.cl"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2.5 text-[var(--color-text)] bg-[var(--color-background)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all sm:text-sm shadow-inner"
                />
              </div>

              {!isLogin && !otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="mt-3 text-orange-500 font-medium cursor-pointer flex items-center text-sm hover:text-orange-600 transition-colors"
                  disabled={otpLoading}
                >
                  <Fingerprint className="w-4 h-4 mr-1"/>
                  {otpLoading ? "Procesando envío..." : "Autenticar mediante OTP"}
                </button>
              )}
              {otpSentMessage && !otpVerified && (
                <p className="text-green-500 font-medium text-sm mt-3 animate-pulse">
                  ✓ El código OTP ha sido enviado tu correo.
                </p>
              )}
              {otpVerified && (
                <p className="text-green-500 font-medium text-sm mt-3 flex items-center">
                  ✓ Identidad verificada con éxito.
                </p>
              )}
            </div>

            <AnimatePresence>
              {!isLogin && otpSent && !otpVerified && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-[var(--border-color)]"
                >
                  <label htmlFor="otp" className="block text-sm font-semibold text-[var(--color-text)] text-center mb-3">
                    Ingresa el Código de Verificación
                  </label>

                  <div className="flex justify-center space-x-3">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="w-12 h-14 font-bold text-center text-[var(--color-text)] bg-[var(--color-background)] border-2 border-[var(--border-color)] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 rounded-xl text-xl transition-all shadow-inner"
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, "");
                          if (val.length <= 1) {
                            const newOtp = [...otpDigits];
                            newOtp[idx] = val;
                            setOtpDigits(newOtp);
                            setOtp(newOtp.join(""));
                            if (val && idx < 4) {
                              document.getElementById(`otp-${idx + 1}`)?.focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
                            document.getElementById(`otp-${idx - 1}`)?.focus();
                          }
                          handleKeyDownOtp(e);
                        }}
                        id={`otp-${idx}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="mt-4 w-full text-orange-500 font-medium cursor-pointer hover:text-orange-600 text-sm bg-orange-500/10 py-2 rounded-lg transition-colors"
                  >
                    Confirmar OTP
                  </button>
                  {localError && (
                    <p className="text-red-500 font-medium text-center text-sm mt-2">{localError}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[var(--color-text)] mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={!isLogin && !otpVerified}
                  className={`block w-full pl-10 pr-10 py-2.5 text-[var(--color-text)] ${
                    !isLogin && !otpVerified
                      ? "bg-black/5 dark:bg-white/5 cursor-not-allowed opacity-50"
                      : "bg-[var(--color-background)] focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  } border border-[var(--border-color)] rounded-xl sm:text-sm shadow-inner transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                </button>
              </div>
            </div>

            {!isLogin && otpSent && (
              <div className="flex justify-center my-4 overflow-hidden rounded-xl border border-[var(--border-color)]">
                <Turnstile
                  sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                  onVerify={(token) => setCaptchaToken(token)}
                  theme={darkMode ? "dark" : "light"}
                />
              </div>
            )}

            {!isLogin && (
              <div className="space-y-3 bg-[var(--color-background)] p-4 rounded-xl border border-[var(--border-color)] mt-4">
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    id="isAdult"
                    checked={isAdult}
                    onChange={() => setIsAdult(!isAdult)}
                    className="mt-1 flex-shrink-0 w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="ml-3 text-sm text-[var(--color-text)] opacity-80 group-hover:opacity-100 transition-opacity">
                    Declaro que soy mayor de 18 años
                  </span>
                </label>
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    id="acceptPrivacy"
                    checked={acceptPrivacy}
                    onChange={() => setAcceptPrivacy(!acceptPrivacy)}
                    className="mt-1 flex-shrink-0 w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="ml-3 text-sm text-[var(--color-text)] opacity-80 group-hover:opacity-100 transition-opacity">
                    He leído y acepto los{" "}
                    <a href="/terminos-condiciones" target="_blank" rel="noopener noreferrer" className="text-orange-500 font-medium hover:underline">
                      Términos y Condiciones
                    </a> de UniBlock
                  </span>
                </label>
              </div>
            )}

            {error && <p className="text-red-500 font-medium text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}
            {message && <p className="text-green-500 font-medium text-sm text-center bg-green-500/10 py-2 rounded-lg border border-green-500/20">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-xl text-white font-bold tracking-wide bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all sm:text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Procesando...
                </span>
              ) : isLogin ? "Ingresar a mi cuenta" : "Crear mi cuenta"}
            </button>
          </form>

          {isLogin && (
            <div className="mt-5 text-center">
              <a href="/request-password-reset" className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors hover:underline">
                ¿Olvidaste tu contraseña? Restablécela aquí
              </a>
            </div>
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border-color)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 font-medium bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)]">
                  O accede usando
                </span>
              </div>
            </div>

            {isLogin && (
              <div className="mt-6">
                <button
                  onClick={handleMicrosoftLogin}
                  className="w-full flex items-center justify-center py-3 px-4 border border-[var(--border-color)] rounded-xl shadow-sm hover:shadow-md text-sm font-bold text-[var(--color-text)] bg-[var(--color-background)] cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                    alt="Microsoft logo"
                    className="w-5 h-5 mr-3"
                  />
                  <span>Login Universitario (Microsoft 365)</span>
                </button>
              </div>
            )}

            <div className="mt-8 text-center bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-[var(--border-color)]">
              <p className="text-sm font-medium text-[var(--color-text)] opacity-80">
                {isLogin ? "¿Aún no te has registrado?" : "¿Ya tienes una cuenta?"}
              </p>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtp("");
                  setLocalError("");
                }}
                className="mt-2 text-orange-600 font-bold cursor-pointer hover:text-orange-700 transition-colors"
              >
                {isLogin ? "Crea una cuenta nueva" : "Inicia sesión ahora"}
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
