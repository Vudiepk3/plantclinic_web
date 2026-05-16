import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';
import SafeImage from './SafeImage';

interface Disease {
  id: string;
  title: string;
  scientific_name: string;
  disease_type: string;
  listImage: string;
  summary: string;
}

export default function DiseaseCard({ disease, index }: { disease: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-[32px] overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <Link to={`/disease/${disease.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <SafeImage
            src={disease.listImage}
            alt={disease.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-emerald-50 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              {disease.disease_type}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-emerald-950 mb-1 group-hover:text-emerald-600 transition-colors">
            {disease.title}
          </h3>
          <p className="text-xs italic text-emerald-800/40 mb-4">
            {disease.scientific_name}
          </p>
          <p className="text-emerald-800/60 text-sm line-clamp-2 leading-relaxed mb-6">
            {disease.summary || "Read more about this plant disease and how to treat it organically."}
          </p>
          <div className="flex items-center text-emerald-600 font-bold text-xs uppercase tracking-widest gap-2">
            Read Guide
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
