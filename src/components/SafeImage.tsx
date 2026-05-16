import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  fallbackClassName?: string;
}

export default function SafeImage({ src, alt, className, fallbackClassName, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-emerald-50 border-2 border-dashed border-emerald-100 text-emerald-200 gap-2 ${className} ${fallbackClassName}`}>
        <ImageOff className="w-1/4 h-1/4 opacity-50" />
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Asset Missing</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
