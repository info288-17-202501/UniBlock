import { Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import Header from '@components/Header'
import Footer from './components/Footer';
import Auth from '@pages/Auth';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
export default App
