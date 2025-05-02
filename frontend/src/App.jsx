import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import Home from '@pages/Home'
import Header from '@components/Header'
import Footer from '@components/Footer';
import Auth from '@pages/Auth';
import VotationForm from '@admin/Votation';
import ScrollToTopButton from '@components/ScrollToTopButton';
import { ProtectedRoute } from '@pages/ProtectedRoute';


function App() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/auth': 'Inicio de sesión - UniBlock',
      '/admin/create-votation': 'Crear Votación - UniBlock',
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
            <Route path="/admin/create-votation" element={<VotationForm />} />
          </Route>

          {/* <Route path="/admin/create-votation" element={<VotationForm />} /> */}
        </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
export default App
