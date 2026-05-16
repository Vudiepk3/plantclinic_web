import React from 'react';
import { ShoppingCart, ExternalLink, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  category: string;
  description: string;
  affiliateLink: string;
}

export default function ShoppingCard({ product, index }: { product: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-[32px] overflow-hidden border border-emerald-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-emerald-50/30">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-emerald-50 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-600">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-lg font-bold text-emerald-950 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
          <span className="text-lg font-black text-emerald-600">{product.price}</span>
        </div>
        <p className="text-emerald-800/60 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-600/10"
        >
          <ShoppingCart className="w-5 h-5" />
          Buy Now
        </a>
      </div>
    </motion.div>
  );
}
