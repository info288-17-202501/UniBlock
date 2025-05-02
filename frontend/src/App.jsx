import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react';

// Pagina Principal
import Home from '@pages/Home'

// Importacion Componentes
import Header from '@components/Header'
import Footer from '@components/Footer';

// Importacion scroll suave
import ScrollToTopButton from '@components/ScrollToTopButton';

import { ProtectedRoute } from '@pages/ProtectedRoute';

import Auth from '@pages/Auth';
// Paginas Admin
import VotationForm from '@pages/admin/Votation';
import Dashboard from '@pages/admin/Dashboard';  // Nueva página Dashboard
import AddUser from '@pages/admin/AddUser';    // Nueva página para agregar usuario


function App() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/auth': 'Inicio de sesión - UniBlock',
      '/admin/dashboard': 'Dashboard - UniBlock',
      '/admin/create-votation': 'Crear Votación - UniBlock',
      '/admin/add-user': 'Agregar Usuario - UniBlock',
    };
    document.title = titles[location.pathname] || 'UniBlock';
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
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
export default App
