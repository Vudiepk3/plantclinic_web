import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'motion/react';
import { 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  Share2, 
  Bookmark,
  ChevronRight,
  Microscope,
  Leaf,
  FlaskConical,
  Activity,
  Loader2,
  Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useDiseases } from '../../context/DiseaseContext';
import AdBanner from '../../components/AdBanner';
import NativeAd from '../../components/NativeAd';
import ErrorState from '../../components/ErrorState';
import SafeImage from '../../components/SafeImage';

export default function DiseaseDetail() {
  const { id } = useParams();
  const { diseases, loading, error, refresh } = useDiseases();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(true);

  // Simulate or trigger Interstitial on entry
  useEffect(() => {
    const timer = setTimeout(() => setShowInterstitial(false), 900);
    return () => clearTimeout(timer);
  }, [id]);

  const disease = diseases.find((d) => d.id === id);

  if (error) {
    return (
      <MainLayout>
        <ErrorState onRetry={refresh} />
      </MainLayout>
    );
  }

  if (showInterstitial) {
    return (
      <MainLayout>
        <div className="h-[70vh] flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <Loader2 className="w-20 h-20 text-emerald-600 animate-spin" />
            <Sparkles className="w-8 h-8 text-emerald-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-emerald-950 font-black text-2xl mb-1">Applying Intelligence...</p>
            <p className="text-emerald-800/40 text-xs font-bold uppercase tracking-widest">Sponsored content loading</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
          <p className="text-emerald-800/60 font-bold">Unlocking botanical data...</p>
        </div>
      </MainLayout>
    );
  }

  if (!disease) {
    return (
      <MainLayout>
        <div className="h-[70vh] flex flex-col items-center justify-center">
          <h2 className="text-3xl font-black text-emerald-950 mb-4">Case Dossier Not Found</h2>
          <Link to="/diseases" className="text-emerald-600 font-bold hover:underline">Return to Library</Link>
        </div>
      </MainLayout>
    );
  }

  const relatedDiseases = diseases
    .filter((d) => d.disease_type === disease.disease_type && d.id !== disease.id)
    .slice(0, 4);

  return (
    <MainLayout>
      {/* Header Area */}
      <div className="bg-emerald-50/50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-sm text-emerald-800/60 mb-6">
            <Link to="/" className="hover:text-emerald-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/diseases" className="hover:text-emerald-600">Diseases</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-emerald-950 font-medium">{disease.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-emerald-600/20">
                  {disease.disease_type}
                </span>
                <span className="text-emerald-800/40 text-xs font-bold uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-emerald-100">
                  ID: #{disease.id}
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-emerald-950 mb-3 leading-tight tracking-tight">
                {disease.title}
              </h1>
              <p className="text-2xl italic text-emerald-800/40 font-medium">{disease.scientific_name}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={cn(
                  "flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all border shadow-sm text-lg",
                  isBookmarked 
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-emerald-600/20" 
                    : "bg-white border-emerald-100 text-emerald-950 hover:border-emerald-300"
                )}
              >
                <Bookmark className={cn("w-6 h-6", isBookmarked && "fill-current")} />
                {isBookmarked ? "Saved" : "Save Guide"}
              </button>
              <button 
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert("Profile URL copied to clipboard!");
                  } catch (err) {
                    console.error("Failed to share:", err);
                  }
                }}
                className="p-4 bg-white border border-emerald-100 rounded-2xl text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* MAIN COLUMN */}
          <div className="lg:col-span-8 space-y-8 pb-10">
            
            {/* Redesigned: Image Stacked Above Info */}
            <div className="space-y-6">
              {disease.listImage && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="aspect-video md:aspect-[21/9] rounded-[3.5rem] overflow-hidden bg-white border border-emerald-100 shadow-2xl shadow-emerald-900/5"
                >
                  <SafeImage src={disease.listImage} alt={disease.title} className="w-full h-full object-cover" />
                </motion.div>
              )}

              <div className="bg-white border border-emerald-100 rounded-[3rem] p-10 md:p-12 shadow-sm relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-60 h-60 bg-emerald-50 rounded-full blur-3xl opacity-50" />
                <h3 className="font-black flex items-center gap-4 mb-4 text-emerald-950 text-3xl">
                  <Info className="w-8 h-8 text-emerald-600" /> Executive Summary
                </h3>
                <p className="text-emerald-800/70 leading-relaxed text-2xl italic font-serif relative z-10">
                  "{disease.summary || "No executive summary available for this dossier."}"
                </p>
                <div className="mt-8 flex flex-wrap gap-6 relative z-10">
                   <div className="flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-2xl">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-900 uppercase tracking-widest">{(disease.disease_type || 'Unknown').toUpperCase()} Pathogen</span>
                   </div>
                </div>
              </div>

              {/* Vị trí quảng cáo mong muốn */}
              <AdBanner slotId="123456789" className="shadow-sm" />
            </div>

            <DetailSection 
              title="Recognize the Signs" 
              icon={<AlertCircle className="w-6 h-6 text-orange-500" />} 
              content={disease.symptoms || "No symptom documentation available."} 
              image={disease.listImage} 
            />

            {/* Native Ads placement */}
            <NativeAd slotId="987654321" />

            <DetailSection 
              title="Root Cause Analysis" 
              icon={<HelpCircle className="w-6 h-6 text-red-500" />} 
              content={disease.cause || "No cause documentation available."} 
              image={disease.listImage} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 p-10 rounded-[2.5rem] border border-emerald-100">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-600/20">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-black text-emerald-950 mb-4">Organic Solutions</h3>
                <p className="text-emerald-800/70 leading-relaxed mb-6">{disease.organic_control || "Consult a specialist for organic treatments."}</p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest px-4 py-2 bg-emerald-100/50 rounded-full w-fit">
                  <CheckCircle2 className="w-4 h-4" /> Eco-Friendly Recommended
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] border border-emerald-100 shadow-sm">
                <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-600/20">
                  <FlaskConical className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-black text-emerald-950 mb-4">Chemical Control</h3>
                <p className="text-emerald-800/70 leading-relaxed mb-6">{disease.chemical_control || "No chemical control recommendations available."}</p>
                <div className="flex items-center gap-2 text-purple-600 font-bold text-[10px] uppercase tracking-widest px-4 py-2 bg-purple-50 rounded-full w-fit">
                  <AlertCircle className="w-4 h-4" /> Use with Caution
                </div>
              </div>
            </div>

            <DetailSection 
              title="Future Prevention Strategy" 
              icon={<Microscope className="w-6 h-6 text-emerald-500" />} 
              content={disease.prevention || "Standard crop hygiene is recommended."} 
              isPositive 
            />
          </div>

          {/* SIDEBAR COLUMN */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              
              {/* Biological Specs */}
              <div className="bg-white rounded-[3rem] p-10 border border-emerald-100 shadow-xl relative overflow-hidden">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-emerald-950">
                  <Activity className="w-6 h-6 text-emerald-600" /> Pathogen Profile
                </h3>
                <div className="space-y-6">
                  <SidebarItem label="Scientific Name" val={disease.scientific_name} />
                  <SidebarItem label="Major Taxonomy" val={disease.disease_type} />
                </div>
              </div>

              {/* Related Knowledge */}
              {relatedDiseases.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-2xl font-black text-emerald-950">Similar Profiles</h3>
                    <Link to="/diseases" className="text-emerald-600 text-sm font-bold hover:underline">View All</Link>
                  </div>
                  <div className="space-y-4">
                    {relatedDiseases.map((d) => (
                      <Link 
                        key={d.id} 
                        to={`/disease/${d.id}`}
                        className="group flex items-center gap-5 p-4 rounded-[2rem] bg-white border border-emerald-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-sm"
                      >
                        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                          <SafeImage src={d.listImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-emerald-950 group-hover:text-emerald-600 transition-colors mb-1">{d.title}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400">{d.disease_type}</span>
                            <ChevronRight className="w-4 h-4 text-emerald-100 group-hover:text-emerald-400 transition-all group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>

        </div>
      </div>
    </MainLayout>
  );
}

function DetailSection({ 
  title, 
  icon, 
  content, 
  image, 
  isPositive = false 
}: { 
  title: string; 
  icon: React.ReactNode; 
  content: string; 
  image?: string;
  isPositive?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="flex items-center gap-6">
         <div className={cn(
           "w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg",
           isPositive ? "bg-emerald-600 shadow-emerald-200" : "bg-white border border-emerald-100 shadow-emerald-900/5"
         )}>
           {React.cloneElement(icon as React.ReactElement, { 
             className: cn(
               (icon as React.ReactElement).props.className, 
               "w-8 h-8", 
               isPositive && "text-white"
             ) 
           })}
         </div>
         <h2 className="text-4xl font-black text-emerald-950 tracking-tight">{title}</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        {image && (
          <div className="w-full aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <SafeImage src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="max-w-4xl">
          <p className="text-emerald-800/70 leading-relaxed text-xl whitespace-pre-line">
            {content}
          </p>
        </div>
      </div>
      <div className="h-px bg-emerald-50 w-full" />
    </motion.section>
  );
}

function SidebarItem({ label, val }: { label: string; val: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase font-black tracking-widest text-emerald-300">{label}</div>
      <div className="font-bold text-emerald-900 text-lg">{val}</div>
    </div>
  );
}
