import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export default function AdBanner({ slotId, format = 'auto', className }: AdBannerProps) {
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    try {
      // Check if adsbygoogle script is loaded
      // @ts-ignore
      if (window.adsbygoogle) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } else {
        // If not loaded within 2 seconds, assume blocked
        const timer = setTimeout(() => {
          // @ts-ignore
          if (!window.adsbygoogle?.loaded) setAdError(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error('AdSense initialization failed:', e);
      setAdError(true);
    }
  }, []);

  if (adError) {
    return (
      <div className="my-4 py-4 px-6 bg-emerald-50/30 border border-emerald-100 rounded-2xl flex items-center gap-4 text-emerald-800/40 italic text-sm">
        <ShieldAlert className="w-5 h-5 flex-shrink-0" />
        Advertisement services unavailable or blocked.
      </div>
    );
  }

  return (
    <div className={`my-8 overflow-hidden flex flex-col justify-center items-center bg-gray-50 border border-dashed border-emerald-200 rounded-2xl min-h-[100px] transition-all duration-500 ${className}`}>
      <div className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold mb-2 pt-2">Advertisement</div>
      
      <ins className="adsbygoogle"
           style={{ display: 'block', minWidth: '250px' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
           data-ad-slot={slotId || "XXXXXXXXXX"}
           data-ad-format={format}
           data-full-width-responsive="true"
           onError={() => setAdError(true)}></ins>
    </div>
  );
}
