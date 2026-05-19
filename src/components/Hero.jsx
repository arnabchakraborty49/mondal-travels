import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronRight, Gauge, MapPin, Wind } from 'lucide-react';
import './Hero.css';

const journeyStates = [
  {
    id: 0,
    speed: 80,
    title: "City to Highway",
    subtitle: "Premium Intercity Service",
    desc: "Starting the journey from the heart of the city with luxury and comfort.",
    bgClass: "city-scene",
    busImage: "/mondal_standard_bus.png",
    animDuration: 1.5
  },
  {
    id: 1,
    speed: 120,
    title: "Express Highway",
    subtitle: "High-Speed Connectivity",
    desc: "Cruising through the expressways with maximum efficiency and safety.",
    bgClass: "highway-scene",
    busImage: "/mondal_standard_bus.png",
    animDuration: 0.8
  },
  {
    id: 2,
    speed: 180,
    title: "Elite Horizon",
    subtitle: "Future of Travel",
    desc: "Pushing boundaries with our top-tier fleet across the horizon.",
    bgClass: "space-scene",
    busImage: "/mondal_winged_bus.png",
    animDuration: 0.4
  }
];

const LightStreaks = ({ speedLevel }) => {
  const streaks = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.5 + Math.random() * 1,
    width: 2 + Math.random() * 4
  })), []);

  return (
    <div className="side-lights">
      {streaks.map(s => (
        <motion.div
          key={s.id}
          className="light-streak"
          style={{ 
            left: `${s.left > 50 ? s.left + 5 : s.left - 5}%`,
            width: `${s.width}px` 
          }}
          animate={{
            top: ['-10%', '110%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: s.duration / (speedLevel + 1),
            repeat: Infinity,
            delay: s.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const RoadEnvironment = ({ speedLevel }) => {
  const roadDuration = journeyStates[speedLevel].animDuration;
  
  return (
    <div className="road-system">
      <motion.div 
        className="road-surface"
        animate={{ 
          backgroundPositionY: ["0px", "400px"] 
        }}
        transition={{ 
          duration: roadDuration, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="road-markings" />
      </motion.div>
    </div>
  );
};

const SpeedParticles = ({ speedLevel }) => {
  const count = (speedLevel + 1) * 20;
  const particles = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.1 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div className="speed-vignette">
      {particles.slice(0, count).map(p => (
        <motion.div
          key={p.id}
          className="speed-particle"
          initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0, scale: 0 }}
          animate={{ 
            y: '150%', 
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: p.duration / (speedLevel + 1), 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: '1px',
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, #00f0ff)',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const [stateIndex, setStateIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const controls = useAnimation();
  const roadControls = useAnimation();

  const currentState = journeyStates[stateIndex];

  const handleNextState = async (index) => {
    if (isTransitioning || index === stateIndex) return;
    setIsTransitioning(true);

    // Camera Shake / Speed Up Effect
    await controls.start({
      y: [0, -5, 5, -5, 0],
      scale: 1.05,
      transition: { duration: 0.4 }
    });

    setStateIndex(index);
    
    // Smooth settle
    await controls.start({
      scale: 1,
      transition: { duration: 1, type: "spring" }
    });

    setIsTransitioning(false);
  };

  return (
    <section className="hero-section">
      <div className="sky-gradient" />
      
      {/* 3D Engine */}
      <div className="environment-engine">
        <RoadEnvironment speedLevel={stateIndex} />
        <LightStreaks speedLevel={stateIndex} />
        <div className={`scene-layer ${stateIndex === 0 ? 'active' : ''}`} style={{ background: 'radial-gradient(circle at center, transparent 30%, #000 100%)' }} />
      </div>

      <SpeedParticles speedLevel={stateIndex} />

      {/* Cinematic HUD */}
      <div className="cinematic-hud">
        <p className="hud-title">Vessel Velocity</p>
        <motion.div 
          className="hud-speed cyan-glow"
          key={stateIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {currentState.speed} <span style={{ fontSize: '1rem' }}>KM/H</span>
        </motion.div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <Gauge size={16} className="text-cyan-400" />
          <Wind size={16} className="text-cyan-400" />
        </div>
      </div>

      {/* Main Bus - Grounded */}
      <div className="bus-visualizer">
        <motion.div 
          className="bus-container"
          animate={controls}
          initial={{ y: 0 }}
        >
          <div className="bus-shadow" />
          <motion.img 
            src={currentState.busImage} 
            alt="Mondal Travel Bus" 
            className="hero-image"
            animate={{ 
              y: [0, -4, 0],
              rotate: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 0.1, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          
          {/* Thrust FX for higher speeds */}
          {stateIndex > 0 && (
            <motion.div 
              className="speed-streaks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute',
                top: '50%', left: '-20%',
                width: '140%', height: '2px',
                background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
                boxShadow: '0 0 20px #00f0ff',
                zIndex: 1
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Content Area */}
      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={stateIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="hero-subtitle cyan-glow">{currentState.subtitle}</p>
            <h1 className="hero-title white-shadow">
              {currentState.title.split(' ')[0]} <br />
              <span className="gradient-text">{currentState.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '30px' }}>
              {currentState.desc}
            </p>
            <div className="contact-actions">
              <a href="https://wa.me/919836683826" target="_blank" rel="noopener noreferrer" className="button-primary" style={{ padding: '15px 40px', fontSize: '1.2rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Chat: 98366 83826
              </a>
              <a href="mailto:mondalbusservices98@gmail.com" className="email-link cyan-glow" style={{ display: 'block', marginTop: '10px', color: '#00f0ff', opacity: 0.8 }}>
                mondalbusservices98@gmail.com
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Continuous Nav */}
      <div className="travel-nav">
        {journeyStates.map((s, idx) => (
          <div 
            key={s.id}
            className={`nav-dot ${stateIndex === idx ? 'active' : ''}`}
            onClick={() => handleNextState(idx)}
          />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: '40px', right: '60px', opacity: 0.5, fontSize: '0.8rem', letterSpacing: '2px' }}>
        ESTABLISHED 1999 • MONDAL TRAVELS & CO
      </div>
    </section>
  );
};

export default Hero;
