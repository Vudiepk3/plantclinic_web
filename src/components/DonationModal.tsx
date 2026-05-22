import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ExternalLink, ShieldCheck } from 'lucide-react';
import { cn } from '../utils/cn';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl shadow-emerald-900/20 w-full max-w-lg pointer-events-auto overflow-hidden relative"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-emerald-50 transition-colors z-10"
              >
                <X className="w-6 h-6 text-emerald-900" />
              </button>

              <div className="p-10">
                <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                  <Heart className="w-10 h-10 text-emerald-600 fill-current" />
                </div>

                <div className="text-center mb-10">
                  <h2 className="text-3xl font-black text-emerald-950 mb-3">Support PlantClinic</h2>
                  <p className="text-emerald-800/60 leading-relaxed">
                    Your contribution helps us keep our AI tools free for small-scale farmers and preserves biodiversity globally.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href="https://paypal.me/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 bg-emerald-50 hover:bg-emerald-100 rounded-[28px] group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <img
                          src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                          alt="PayPal"
                          className="h-4 object-contain"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-emerald-950 block">Donate with PayPal</span>
                        <span className="text-xs text-emerald-800/40">Secure & fast checkout</span>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-emerald-300 group-hover:text-emerald-600 transition-colors" />
                  </a>

                  <div className="grid grid-cols-2 gap-4">
                    {['$10', '$25', '$50', '$100'].map((amount) => (
                      <button
                        key={amount}
                        className="p-4 border-2 border-emerald-50 rounded-2xl font-bold text-emerald-600 hover:border-emerald-600 hover:text-emerald-600 transition-all active:scale-95"
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-emerald-800/40">
                  <ShieldCheck className="w-4 h-4" />
                  100% Secure & Encrypted Connection
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
