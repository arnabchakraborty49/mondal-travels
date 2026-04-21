import React from 'react';
import { motion } from 'framer-motion';
import { Car, BusFront, Plane } from 'lucide-react';
import './Fleet.css';

const Fleet = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="fleet-section" id="fleet">
      <div className="section-header">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Elite <span className="gradient-text">Fleet</span>
        </motion.h2>
        <p className="section-subtitle">From 4-seater sedans to 56-seater luxury cruisers</p>
      </div>

      <motion.div 
        className="fleet-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Sedan */}
        <motion.div 
          className="fleet-card glass-panel" 
          variants={itemVariants} 
          whileHover={{ 
            y: -15, 
            rotateX: 5, 
            rotateY: -5,
            transition: { duration: 0.3 }
          }}
        >
          <div className="card-icon"><Car size={48} /></div>
          <h3>Premium Sedans</h3>
          <p className="capacity">4 Seater</p>
          <p className="desc">Ideal for small executive teams, quick city office transfers, or intimate travel groups.</p>
          <ul className="features">
            <li>AC Available</li>
            <li>Plush Interiors</li>
            <li>Extra Trunk Space</li>
          </ul>
        </motion.div>

        {/* Traveller */}
        <motion.div 
          className="fleet-card glass-panel" 
          variants={itemVariants} 
          whileHover={{ 
            y: -15, 
            rotateX: 5, 
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
        >
          <div className="card-icon" style={{color: 'var(--accent-purple)'}}><BusFront size={48} /></div>
          <h3>Mid-size Travellers</h3>
          <p className="capacity">10 - 15 Seater</p>
          <p className="desc">The perfect balance for family tours, college trips, and medium-sized bookings.</p>
          <ul className="features">
            <li>AC & Non-AC</li>
            <li>Reclining Seats</li>
            <li>Entertainment System</li>
          </ul>
        </motion.div>

        {/* Big Bus */}
        <motion.div 
          className="fleet-card glass-panel" 
          variants={itemVariants} 
          whileHover={{ 
            y: -15, 
            rotateX: 5, 
            rotateY: -5,
            transition: { duration: 0.3 }
          }}
        >
          <div className="card-icon" style={{color: 'var(--accent-cyan)'}}><BusFront size={48} /></div>
          <h3>Luxury Coaches</h3>
          <p className="capacity">Up to 56 Seater</p>
          <p className="desc">Massive capacity for marriage events, massive tourist groups, and corporate events.</p>
          <ul className="features">
            <li>AC & Non-AC</li>
            <li>Panoramic Windows</li>
            <li>On-board Wifi</li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div 
        className="cta-container"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="glass-panel huge-cta">
          <h2>Ready to hit the road?</h2>
          <p>Book your perfect vehicle today and experience travel the Mondal way.</p>
          <a href="tel:+919836683826" className="button-primary checkout-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Call: 98366 83826
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Fleet;
