import { Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import Header from '@components/Header'
import Footer from '@components/Footer';
import Auth from '@pages/Auth';
import VotationForm from '@admin/Votation';
import ScrollToTopButton from '@components/ScrollToTopButton';
import { ProtectedRoute } from '@pages/ProtectedRoute';



function App() {
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
