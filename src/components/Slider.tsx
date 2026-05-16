import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import sliderData from '../data/slider.json';
import SafeImage from './SafeImage';
import { openExternalLink } from '../utils/safeLinks';

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent(current === sliderData.length - 1 ? 0 : current + 1);
  const prev = () => setCurrent(current === 0 ? sliderData.length - 1 : current - 1);

  return (
    <section className="py-12 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="relative aspect-[21/9] rounded-[32px] overflow-hidden shadow-2xl group">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <SafeImage
              src={sliderData[current].image}
              alt={sliderData[current].title}
              className="w-full h-full object-cover transition-transform duration-[7000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-12 flex flex-col justify-end" />
            
            <div className="absolute bottom-12 left-12 right-12 z-10 max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {sliderData[current].title}
                </h2>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  {sliderData[current].subtitle}
                </p>
                <button
                  onClick={() => openExternalLink(sliderData[current].youtubeUrl)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 w-fit transition-all active:scale-95 shadow-lg shadow-red-600/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch on YouTube
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 border border-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 border border-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {sliderData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === current ? 'w-8 bg-emerald-500' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
