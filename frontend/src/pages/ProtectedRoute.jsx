import { useAuth } from "../Hooks/useAuthenticated";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ roles = [] }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <div>Cargando...</div>; // O un spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Verificación de roles si es necesario
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
