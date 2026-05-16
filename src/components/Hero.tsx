import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=2000")'}}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/90 via-emerald-50/40 to-transparent" />
      </div>

      {/* Floating Leaves Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 1000, opacity: 0, rotate: 0 }}
            animate={{ 
              y: 1000, 
              x: Math.random() * 1000 + 100, 
              opacity: [0, 0.4, 0], 
              rotate: 360 
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              ease: 'linear',
              delay: Math.random() * 5
            }}
            className="absolute w-12 h-12 text-emerald-500/10"
          >
            <Zap className="w-full h-full fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-200/50">
              Leading Agri-Tech Platform
            </span>
            <h1 className="text-6xl md:text-7xl font-bold text-emerald-950 tracking-tight leading-[1.1] mb-6">
              Detect & Treat <br />
              <span className="text-emerald-600">
                Plant Diseases
              </span>
            </h1>
            <p className="text-xl text-emerald-800/60 mb-10 leading-relaxed max-w-lg">
              The premium encyclopedia for plant health. Identify issues instantly and find sustainable organic treatments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/diseases"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-600/20 active:scale-95 flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Explore Catalog
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
