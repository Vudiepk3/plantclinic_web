import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'motion/react';
import { Info, Users, Globe, Target, Sprout, Heart } from 'lucide-react';
import { useDonation } from '../context/DonationContext';

export default function About() {
  const { openDonationModal } = useDonation();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mb-24">
          <h1 className="text-7xl font-black text-emerald-950 mb-8 tracking-tighter italic">Our Mission.</h1>
          <p className="text-2xl text-emerald-800/60 leading-relaxed font-medium">
            At PlantClinic, we believe that the health of our plants is inextricably linked to the health of our planet. We build technology that empowers farmers and gardeners to protect their crops sustainably.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-32">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover"
              alt="Sustainable farming"
            />
            <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
          </div>
          <div className="space-y-12">
            <StorySection 
              icon={<Target className="w-8 h-8 text-emerald-600" />}
              title="Global Impact"
              text="Our AI scanner processes millions of requests each month, helping farmers in over 120 countries prevent crop loss and improve yields."
            />
            <StorySection 
              icon={<Users className="w-8 h-8 text-emerald-600" />}
              title="Expert Community"
              text="We work with leading agronomists and plant pathologists to ensure every recommendation is accurate and actionable."
            />
            <StorySection 
              icon={<Sprout className="w-8 h-8 text-emerald-600" />}
              title="Sustainable Future"
              text="Our focus is on organic and preventative control, reducing the reliance on harmful chemicals in industrial agriculture."
            />
          </div>
        </div>

        <div className="bg-emerald-950 text-white rounded-[3rem] p-16 text-center">
            <Heart className="w-16 h-16 text-emerald-500 mx-auto mb-8 animate-pulse fill-current" />
            <h2 className="text-4xl md:text-5xl font-black mb-8">Join our green revolution.</h2>
            <p className="text-emerald-200/60 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              PlantClinic is a non-profit initiative. Every donation helps us keep our AI tools free for small-scale farmers worldwide.
            </p>
            <button 
              onClick={openDonationModal}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all active:scale-95 shadow-2xl shadow-emerald-600/20"
            >
              Donate to PlantClinic
            </button>
        </div>
      </div>
    </MainLayout>
  );
}

function StorySection({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-6">
      <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-3 text-emerald-950">{title}</h3>
        <p className="text-emerald-800/60 leading-relaxed italic">{text}</p>
      </div>
    </div>
  );
}
