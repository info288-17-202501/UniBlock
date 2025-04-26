import { Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import Header from '@components/Header'
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';



function App() {
  return (
    <>
    {/* <Header /> Con o sin esto sigue funcionando el nav, no entiendo*/}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
export default App
