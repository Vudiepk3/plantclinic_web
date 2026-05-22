import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | string[];
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  fallbackClassName?: string;
}

export default function SafeImage({
  src,
  alt,
  className,
  fallbackClassName,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  const actualSrc = Array.isArray(src) ? src[0] : src;

  useEffect(() => {
    setError(false);
  }, [actualSrc]);

  if (error || !actualSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-emerald-50 border-2 border-dashed border-emerald-100 text-emerald-200 gap-2 ${className} ${fallbackClassName}`}
      >
        <ImageOff className="w-1/4 h-1/4 opacity-50" />
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
          Asset Missing
        </span>
      </div>
    );
  }

  return (
    <img
      src={actualSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}