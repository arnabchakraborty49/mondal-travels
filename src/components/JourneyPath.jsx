import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Navigation, Bus } from 'lucide-react';
import './JourneyPath.css';

const JourneyPath = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Opacity for milestones based on scroll
  const milestone1Opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const milestone2Opacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const milestone3Opacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const milestone4Opacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  return (
    <section className="journey-section" ref={containerRef}>
      <div className="section-header">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Your Journey, <span className="gradient-text">Our Priority</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="section-subtitle"
        >
          Leading the travel industry since 1999
        </motion.p>
      </div>

      <div className="road-container">
        {/* Animated Road Line */}
        <svg className="road-svg" viewBox="0 0 100 1000" preserveAspectRatio="none">
          <motion.path 
            d="M 50 0 C 100 200, 0 400, 50 600 C 100 750, 0 850, 50 1000"
            fill="transparent"
            stroke="var(--border-color)"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <motion.path 
            d="M 50 0 C 100 200, 0 400, 50 600 C 100 750, 0 850, 50 1000"
            fill="transparent"
            stroke="var(--accent-cyan)"
            strokeWidth="4"
            style={{ 
              pathLength,
              filter: "drop-shadow(0 0 10px rgba(0, 240, 255, 0.8))"
            }}
          />
        </svg>

        {/* Traveling Bus Indicator */}
        <motion.div 
          className="traveling-bus"
          style={{ 
            offsetPath: "path('M 50 0 C 100 200, 0 400, 50 600 C 100 750, 0 850, 50 1000')",
            offsetDistance: useTransform(pathLength, [0, 1], ["0%", "100%"]),
            position: 'absolute',
            top: 0, left: 0,
            zIndex: 5
          }}
        >
          <Bus size={32} color="var(--accent-cyan)" style={{ filter: 'drop-shadow(0 0 10px var(--accent-cyan))' }} />
        </motion.div>

        {/* Journey Milestones */}
        <div className="milestones">
          <motion.div 
            className="milestone glass-panel left"
            style={{ opacity: milestone1Opacity }}
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <div className="icon-box"><MapPin /></div>
            <h3>College & Office Pickups</h3>
            <p>Reliable and punctual daily commutes with our diverse fleet of AC and Non-AC buses.</p>
          </motion.div>

          <motion.div 
            className="milestone glass-panel right"
            style={{ opacity: milestone2Opacity }}
            initial={{ x: 100 }}
            whileInView={{ x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <div className="icon-box"><Navigation /></div>
            <h3>Tourist Vogue</h3>
            <p>Experience the scenic routes in maximum luxury. Sit back, relax, and enjoy the ride.</p>
          </motion.div>

          <motion.div 
            className="milestone glass-panel left"
            style={{ opacity: milestone3Opacity }}
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <div className="icon-box" style={{ color: 'var(--accent-purple)' }}><MapPin /></div>
            <h3>Marriage & Events</h3>
            <p>Make your special day seamless with our premium event transportation booking.</p>
          </motion.div>

          <motion.div 
            className="milestone glass-panel right"
            style={{ opacity: milestone4Opacity }}
            initial={{ x: 100 }}
            whileInView={{ x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <div className="icon-box" style={{ color: 'var(--accent-cyan)' }}><Navigation /></div>
            <h3>Corporate & Executive</h3>
            <p>Punctual and professional transit solutions for your business needs and corporate gatherings.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JourneyPath;
