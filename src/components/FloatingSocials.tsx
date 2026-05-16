import React from 'react';
import { Facebook, Youtube, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useDonation } from '../context/DonationContext';
import { openExternalLink } from '../utils/safeLinks';

export default function FloatingSocials() {
  const { openDonationModal } = useDonation();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <SocialButton 
        icon={<Facebook className="w-6 h-6 text-emerald-600" />} 
        label="Facebook" 
        onClick={() => openExternalLink('https://facebook.com/plantclinic')} 
      />
      <SocialButton 
        icon={<Youtube className="w-6 h-6 text-red-600" />} 
        label="YouTube" 
        onClick={() => openExternalLink('https://youtube.com/c/plantclinic')} 
      />
      <motion.div
        onClick={openDonationModal}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer shadow-xl animate-pulse border-2 border-white"
      >
        <Heart className="w-6 h-6 text-white" />
      </motion.div>
    </div>
  );
}

function SocialButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
      className="w-12 h-12 glass rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-transform"
    >
      {icon}
    </motion.button>
  );
}
