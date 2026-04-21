import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './components/Hero';
import JourneyPath from './components/JourneyPath';
import Fleet from './components/Fleet';
import './App.css';

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="app-container" ref={containerRef}>
      {/* Background Decor */}
      <div className="bg-decorations">
        <motion.div className="bg-blob blob-1" style={{ y: y1, rotate }} />
        <motion.div className="bg-blob blob-2" style={{ y: y2, rotate: -rotate }} />
      </div>

      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <h1 className="logo-text">Mondal <span className="gradient-text">Travels & Co</span></h1>
        </div>
        <nav className="nav-links">
          <a href="mailto:mondalbusservices@gmail.com">Email Us</a>
          <a href="tel:+919836683826" className="phone-nav">📞 98366 83826</a>
          <a href="#fleet">Our Fleet</a>
        </nav>
      </header>

      {/* Main Sections */}
      <main>
        <Hero />
        <JourneyPath />
        <Fleet />
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Mondal Travels & Co | Established in 1999</p>
      </footer>
    </div>
  );
}

export default App;
