import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Youtube } from 'lucide-react';
import { useDonation } from '../context/DonationContext';
import { openExternalLink } from '../utils/safeLinks';

export default function Footer() {
  const { openDonationModal } = useDonation();

  return (
    <footer className="bg-emerald-50/50 border-t border-emerald-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="text-white w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight text-emerald-900">
                PlantClinic
              </span>
            </Link>
            <p className="text-emerald-800/60 text-sm leading-relaxed">
              Empowering farmers and plant lovers worldwide with expert disease detection and recovery strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-emerald-950 mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/diseases" className="text-sm text-emerald-800/60 hover:text-emerald-600 transition-colors">Diseases</Link></li>
              <li><Link to="/shopping" className="text-sm text-emerald-800/60 hover:text-emerald-600 transition-colors">Shopping</Link></li>
              <li><Link to="/about" className="text-sm text-emerald-800/60 hover:text-emerald-600 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-emerald-950 mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-sm text-emerald-800/60 hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-sm text-emerald-800/60 hover:text-emerald-600 transition-colors">Contact Information</Link></li>
              <li><Link to="/faq" className="text-sm text-emerald-800/60 hover:text-emerald-600 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold text-emerald-950 mb-6">Stay Connected</h4>
            <div className="flex space-x-4 mb-6">
              <SocialIcon 
                icon={<Facebook className="w-5 h-5" />} 
                onClick={() => openExternalLink('https://facebook.com/plantclinic')} 
              />
              <SocialIcon 
                icon={<Youtube className="w-5 h-5" />} 
                onClick={() => openExternalLink('https://youtube.com/c/plantclinic')} 
              />
            </div>
            <button
              onClick={openDonationModal}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg shadow-emerald-600/20"
            >
              <Heart className="w-4 h-4 fill-current" />
              Support Our Mission
            </button>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-emerald-800/40">
            © {new Date().getFullYear()} PlantClinic. All rights reserved.
          </p>
          <p className="text-xs text-emerald-800/40">
            Created with passion for a greener world.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, onClick }: { icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-800/40 hover:text-emerald-600 hover:border-emerald-600 transition-all cursor-pointer"
    >
      {icon}
    </button>
  );
}
