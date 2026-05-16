import React, { useEffect, useState } from 'react';
import { Share2, Info } from 'lucide-react';

interface NativeAdProps {
  slotId?: string;
  className?: string;
}

export default function NativeAd({ slotId, className }: NativeAdProps) {
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    try {
      // @ts-ignore
      if (window.adsbygoogle) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } else {
        setAdError(true);
      }
    } catch (e) {
      console.error('Native Ad failed:', e);
      setAdError(true);
    }
  }, []);

  if (adError) return <div className="h-4 bg-emerald-50/10 rounded-full w-1/3 mx-auto mt-4" />;

  return (
    <div className={`bg-white border-2 border-emerald-50 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group ${className}`}>
      <div className="absolute top-0 right-0 p-4">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300 bg-emerald-50 px-3 py-1 rounded-full">Sponsor</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-48 aspect-square bg-emerald-50 rounded-[2rem] flex items-center justify-center overflow-hidden border border-emerald-100 italic text-emerald-200">
           {/* AdSense will replace this content */}
           Native Ad Space
        </div>
        
        <div className="flex-1 space-y-4">
           <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
             <Info className="w-4 h-4" /> Recommended Resource
           </div>
           <h4 className="text-2xl font-black text-emerald-950">Maximize Your Crop Yield with Advanced Nutrition</h4>
           <p className="text-emerald-800/60 leading-relaxed font-medium">Discover top-rated organic fertilizers and bio-stimulants tested by botanical experts for high-resistance crops.</p>
           
           <div className="pt-2">
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black text-sm transition-all hover:bg-emerald-700 active:scale-95 flex items-center gap-2">
                Learn More <Share2 className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>

      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ins className="adsbygoogle"
             style={{ display: 'block', textAlign: 'center' }}
             data-ad-layout="in-article"
             data-ad-format="fluid"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slotId || "XXXXXXXXXX"}></ins>
      </div>
    </div>
  );
}
