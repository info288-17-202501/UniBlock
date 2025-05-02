import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
// Pagina Principal
import Home from '@pages/Home'
// Importacion Componentes
import Header from '@components/Header'
// Importacion scroll suave
import ScrollToTopButton from '@components/ScrollToTopButton';
// Importacion para proteger rutas de admin
import { ProtectedRoute } from '@pages/ProtectedRoute';
import Auth from '@pages/Auth';
// Paginas Admin
import VotationForm from '@pages/admin/Votation';
import Dashboard from '@pages/admin/Dashboard';  // Nueva página Dashboard
import AddUser from '@pages/admin/AddUser';    // Nueva página para agregar usuario


const appName = 'UniBlock';

function App() {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      '/auth': `Inicio de sesión - ${appName}`,
      '/admin/dashboard': `Dashboard - ${appName}`,
      '/admin/create-votation': `Crear votación - ${appName}`,
      '/admin/add-user': `Agregar usuario - ${appName}`,
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
          </Route>
        </Routes>
      <ScrollToTopButton />
    </>
  );
}
export default App
