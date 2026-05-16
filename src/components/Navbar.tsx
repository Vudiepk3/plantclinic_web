import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Youtube, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';
import { useDonation } from '../context/DonationContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Diseases', path: '/diseases' },
  { name: 'Shopping', path: '/shopping' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openDonationModal } = useDonation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled
          ? 'glass shadow-emerald-100/20 border-emerald-100/50 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200/50">
            <Heart className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-emerald-950">
            Plant<span className="text-emerald-600">Clinic</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-semibold transition-colors hover:text-emerald-600',
                location.pathname === link.path
                  ? 'text-emerald-700'
                  : 'text-emerald-800/60'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 border-l border-emerald-100 pl-4">
            <a href="https://facebook.com" className="p-2 text-emerald-800/40 hover:text-emerald-600 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://youtube.com" className="p-2 text-emerald-800/40 hover:text-emerald-600 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <button
              onClick={openDonationModal}
              className="ml-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
            >
              Donate Me
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-emerald-900"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-emerald-50 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-lg font-medium',
                    location.pathname === link.path
                      ? 'text-emerald-600'
                      : 'text-emerald-800/60'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-emerald-50 flex items-center space-x-6">
                <a href="#" className="flex items-center gap-2 text-emerald-800/60">
                  <Facebook className="w-5 h-5" /> Facebook
                </a>
                <a href="#" className="flex items-center gap-2 text-emerald-800/60">
                  <Youtube className="w-5 h-5" /> YouTube
                </a>
              </div>
              <button
                onClick={openDonationModal}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl text-center font-bold text-lg"
              >
                Donate Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
