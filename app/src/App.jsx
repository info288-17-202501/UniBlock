import { Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import Header from '@components/Header'
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
export default App
