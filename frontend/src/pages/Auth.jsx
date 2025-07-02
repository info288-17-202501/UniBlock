import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Turnstile from "react-turnstile";
import useLogin from "../Hooks/useLogin";
import useRegister from "../Hooks/useRegister";
import { useDarkMode } from "@context/darkModeContext";

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
        setLocalError("Solo se permiten correos @uach.cl");
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

    // Calcula la posición centrada
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      "http://localhost:3000/auth/microsoft",
      "targetWindow",
      `toolbar=no,
      location=no,
      status=no,
      menubar=no,
      scrollbars=yes,
      resizable=yes,
      width=${width},
      height=${height},
      top=${top},
      left=${left}`
    );

    const receiveMessage = (event) => {
      if (event.origin === "http://localhost:3000" && event.data) {
        sessionStorage.setItem("user", JSON.stringify(event.data));
        popup?.close();
        window.removeEventListener("message", receiveMessage);
        window.location.href = "/user/dashboard"; // Redirige a la página de usuario
      }
    };

    window.addEventListener("message", receiveMessage);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-secondary)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <button
        onClick={handleGoBack}
        className="absolute top-6 left-6 flex items-center  space-x-1 py-2 px-6 rounded-md bg-[var(--button-background-color)] text-[var(--button-text-color)] hover:bg-[var(--button-background-color-hover)] border border-[var(--button-background-color)] hover:border-[var(--button-background-color-hover)]  shadow-sm transition-all duration-200 cursor-pointer "
      >
        <span className="text-lg ">←</span>
        <span className="font-medium">Volver</span>
      </button>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="/logo.png"
          alt="Logo de la página"
          className="mx-auto h-16 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl font-extrabold text-[var(--color-text)] font-title">
          {isLogin ? "Iniciar sesión" : "Crear una cuenta"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--color-background)] py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-[var(--color-text)] font-medium font-subtitle text-[--color-text]"
                >
                  Ingresa tu nombre
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 text-[var(--color-text)] border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium font-subtitle text-[var(--color-text)]"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 text-[var(--color-text)] border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />

              {!isLogin && !otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="mt-2 text-blue-600 cursor-pointer hover:underline text-sm"
                  disabled={otpLoading}
                >
                  {otpLoading ? "Enviando..." : "Enviar OTP al correo"}
                </button>
              )}
              {otpSentMessage && !otpVerified && (
                <p className="text-green-500 text-sm mt-4">
                  ¡El OTP ha sido enviado al correo!
                </p>
              )}
              {otpVerified && (
                <p className="text-green-500 text-sm mt-2">
                  OTP verificado exitosamente.
                </p>
              )}
            </div>

            {!isLogin && otpSent && !otpVerified && (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-[var(--color-text)]"
                >
                  Código OTP
                </label>

                <div className="flex space-x-2 mt-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-12 h-12 text-center text-[var(--color-text)] border border-gray-300 rounded-md text-xl"
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
                        if (
                          e.key === "Backspace" &&
                          !otpDigits[idx] &&
                          idx > 0
                        ) {
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
                  className="mt-2 text-blue-600 cursor-pointer hover:underline text-sm"
                >
                  Verificar OTP
                </button>
                {localError && (
                  <p className="text-red-500 text-sm">{localError}</p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium font-subtitle text-[var(--color-text)]"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={!isLogin && !otpVerified}
                  className={`mt-1 block w-full text-[var(--color-text)] px-3 py-2 border ${
                    !isLogin && !otpVerified
                      ? "bg-gray-100 cursor-not-allowed"
                      : "border-gray-300"
                  } rounded-md shadow-sm sm:text-sm`}
                />
                {formData.password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>
            </div>

            {!isLogin && otpSent && (
              <Turnstile
                sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                onVerify={(token) => setCaptchaToken(token)}
                className="w-full"
                theme={darkMode ? "dark" : "light"}
              />
            )}

            {!isLogin && (
              <div className="space-y-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="isAdult"
                    checked={isAdult}
                    onChange={() => setIsAdult(!isAdult)}
                    className="mr-2 mt-1"
                  />
                  <label
                    htmlFor="isAdult"
                    className="text-sm text-[var(--color-text)]"
                  >
                    Acepto que soy mayor de 18 años
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptPrivacy"
                    checked={acceptPrivacy}
                    onChange={() => setAcceptPrivacy(!acceptPrivacy)}
                    className="mr-2 mt-1"
                  />
                  <label
                    htmlFor="acceptPrivacy"
                    className="text-sm text-[var(--color-text)]"
                  >
                    Acepto los{" "}
                    <a
                      href="/terminos-condiciones"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      términos y condiciones de UniBlock
                    </a>
                  </label>
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 sm:text-sm cursor-pointer "
              >
                {loading
                  ? "Procesando..."
                  : isLogin
                  ? "Iniciar sesión"
                  : "Registrarse"}
              </button>
            </div>
          </form>

          {isLogin && (
            <>
            <div className="mt-5 text-center">
              <span className=" mt-5 px-2 bg-[var(--color-background)] text-[var(--color-text-secondary)] text-sm">
                ¿Olvidaste tu contraseña?
              </span>
              <div className="mt-2 text-center">
                <a
                  href="/request-password-reset"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Haz clic aquí para restablecerla
                </a>
              </div>
              </div>
            </>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--color-background)] text-[var(--color-text-secondary)]">
                  O continuar con
                </span>
              </div>
            </div>

            {isLogin && (
              <div className="mt-6">
                <button
                  onClick={handleMicrosoftLogin}
                  className="w-full flex justify-center py-2 px-4 border border-[var(--button-border-color)] rounded-md shadow-sm text-sm font-medium text-[var(--button-text-color)] bg-[var(--button-background-color)] cursor-pointer hover:bg-[var(--button-background-color-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                    alt="Microsoft logo"
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-sm flex items-center text-center leading-tight">
                    Continuar con cuenta Microsoft UACh
                  </span>
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--color-text)] font-subtitle">
                {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
              </p>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtp("");
                  setLocalError("");
                }}
                className="mt-2 text-blue-600 cursor-pointer  hover:underline text-sm"
              >
                {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
