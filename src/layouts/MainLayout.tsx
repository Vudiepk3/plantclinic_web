import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingSocials from '../components/FloatingSocials';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-emerald-50/50 text-emerald-950 transition-colors duration-300">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="pt-16 pb-20"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingSocials />
    </div>
  );
}
