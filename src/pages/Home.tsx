import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Hero from '../components/Hero';
import Slider from '../components/Slider';
import DiseaseCard from '../components/DiseaseCard';
import { motion } from 'motion/react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDiseases } from '../context/DiseaseContext';
import ErrorState from '../components/ErrorState';

export default function Home() {
  const { diseases, loading, error, refresh } = useDiseases();
  const popularDiseases = diseases.slice(0, 3);

  if (error) {
    return (
      <MainLayout>
        <ErrorState onRetry={refresh} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Hero />
      <Slider />

      {/* Popular Diseases Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
              Library
            </span>
            <h2 className="text-5xl font-bold text-emerald-950 leading-[1.1]">Trending Health <br /> Issues <span className="text-emerald-600">Right Now</span>.</h2>
          </div>
          <Link
            to="/diseases"
            className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase hover:gap-4 transition-all"
          >
            Explore All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
             <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
             <p className="text-emerald-800/60 font-bold">Scanning library...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {popularDiseases.map((disease, idx) => {
              const Card = DiseaseCard as any;
              return <Card key={disease.id} disease={disease} index={idx} />;
            })}
          </div>
        )}
      </section>
      
      {/* Stats Section */}
      <section className="py-24 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Plants Monitored', val: '5M+' },
              { label: 'Library Size', val: '500+' },
              { label: 'Success Rate', val: '98%' },
              { label: 'AI Accuracy', val: '99.2%' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-6xl font-black text-emerald-900 mb-2">{stat.val}</div>
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
