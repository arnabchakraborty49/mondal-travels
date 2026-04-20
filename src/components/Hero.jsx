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
            <button className="button-primary" style={{ padding: '15px 40px', fontSize: '1.2rem' }}>
              Book Journey Now
            </button>
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
