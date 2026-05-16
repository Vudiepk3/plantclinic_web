import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ 
  message = "We encountered a biological sync error while fetching crop data.", 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mb-8 border border-orange-100 shadow-xl shadow-orange-950/5">
        <AlertTriangle className="w-10 h-10 text-orange-500" />
      </div>
      <h3 className="text-3xl font-black text-emerald-950 mb-3">Database Connection Interrupted</h3>
      <p className="text-emerald-800/60 font-medium max-w-md mb-8 leading-relaxed">
        {message} Please ensure your connection is stable or check the data source configuration.
      </p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Attempt Re-Sync
        </button>
      )}
    </div>
  );
}
