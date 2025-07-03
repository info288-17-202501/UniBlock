import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
// Pagina Principal
import Home from "@pages/Home";
// Importacion Componentes
import Header from "@components/Header";
// Importacion scroll suave
import ScrollToTopButton from "@components/ScrollToTopButton";
// Importacion para proteger rutas de admin
import { ProtectedRoute } from "@pages/ProtectedRoute";
import Auth from "@pages/Auth";
// Paginas Admin
import VotationForm from "@admin/Votation";
import Dashboard from "@admin/Dashboard"; 
import AddUser from "@admin/AddUser"; 
import UserDashboard from "@user/Dashboard";
import Votation from "@user/Votation";
import ResetPassword from "@pages/ResetPassword";
import RequestPasswordReset from "@pages/RequestPasswordReset";
import VotationPanel from "./pages/admin/VotationPanel";
import ResultsPage from "./pages/user/ResultsPage";


import TerminosCondiciones from "./pages/TerminosCondiciones";
import PoliticasPrivacidad from "./pages/PoliticasPrivacidad";
import Nosotros from "./pages/Nosotros";

const appName = "UniBlock";

function App() {
  const location = useLocation();
  if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark");
  }
  useEffect(() => {
    const routeTitles = {
      "/auth": `Inicio de sesión - ${appName}`,
      "/admin/dashboard": `Dashboard - ${appName}`,
      "/admin/create-votation": `Crear votación - ${appName}`,
      "/admin/add-user": `Agregar usuario - ${appName}`,
      "/user/dashboard": `Dashboard - ${appName}`,
    };

    const currentTitle = routeTitles[location.pathname];
    if (currentTitle) {
      document.title = currentTitle;
    } else {
      document.title = appName; // Título general si la ruta no está mapeada
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/create-votation" element={<VotationForm />} />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/vote/:votationId" element={<Votation />} />
          <Route path="/admin/votations" element={<VotationPanel />} />
          <Route path="/results/:id" element={<ResultsPage />} />
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />
        <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
        <Route path="/privacidad" element={<PoliticasPrivacidad />} />
        <Route path="/nosotros" element={<Nosotros />} />

        {/* Rutas de de usuarui invalida retorna a inicio */}
        <Route path="*" element={<Home />} />
      
      </Routes>
      <ScrollToTopButton />
    </>
  );
}
export default App;
