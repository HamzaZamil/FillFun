import { useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Landing from './components/landing/landing';

import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/vendor/glightbox/css/glightbox.min.css';
import './assets/vendor/swiper/swiper-bundle.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/vendor/php-email-form/validate.js';
// import './assets/vendor/glightbox/js/glightbox.min.js';
import './assets/vendor/purecounter/purecounter_vanilla.js';
import './assets/vendor/swiper/swiper-bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const ScrollToTopButton = ({ isVisible, onClick }) => {
  return isVisible ? (
    <button className="scroll-top active" onClick={onClick} aria-label="Scroll to top">
      <i className="bi bi-arrow-up"></i>
    </button>
  ) : null;
};

function App() {
  const [scrollTopActive, setScrollTopActive] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });

    const handleScroll = () => {
      setScrollTopActive(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>

        <Footer />
        <ScrollToTopButton isVisible={scrollTopActive} onClick={scrollToTop} />
      </div>
    </Router>
  );
}

export default App;
