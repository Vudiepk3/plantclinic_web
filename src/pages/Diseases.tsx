import React, { useState, useMemo } from 'react';
import MainLayout from '../layouts/MainLayout';
import DiseaseCard from '../components/DiseaseCard';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, Loader2 } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { motion, AnimatePresence } from 'motion/react';
import { useDiseases } from '../context/DiseaseContext';
import ErrorState from '../components/ErrorState';

const categories = ['All', 'Fungal', 'Bacterial', 'Viral', 'Pest', 'Weeds', 'Insect Pests', 'Nutrient Deficiencies', 'Other'];

export default function Diseases() {
  const { diseases, loading, error, refresh } = useDiseases();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredDiseases = useMemo(() => {
    let result = diseases.filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        d.scientific_name.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || d.disease_type === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'popular') {
      // Simulate popularity by ID or random
      result.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return result;
  }, [debouncedSearch, selectedCategory, sortBy]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="mb-16">
          <h1 className="text-5xl font-black text-emerald-950 mb-4 tracking-tight">
            Diseases Library
          </h1>
          <p className="text-emerald-800/60 text-lg">
            Browse our comprehensive database of plant health threats and recovery guides.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-emerald-100 rounded-3xl p-4 md:p-6 mb-12 shadow-sm flex flex-col lg:flex-row items-center gap-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or scientific name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-emerald-50/30 border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-emerald-500 text-emerald-950 transition-all shadow-inner placeholder:text-emerald-300"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 p-2 bg-emerald-50/30 rounded-2xl border border-emerald-100">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400 ml-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer pr-8 text-emerald-900"
              >
                <option value="newest">Newest First</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all border ${selectedCategory === cat
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'bg-white border-emerald-100 text-emerald-800/60 hover:border-emerald-500 hover:text-emerald-500'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="popLayout">
          {error ? (
            <ErrorState onRetry={refresh} />
          ) : loading ? (
            <div className="py-32 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
              <p className="text-emerald-800/60 font-bold">Fetching latest plant health data...</p>
            </div>
          ) : filteredDiseases.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24"
            >
              {filteredDiseases.map((disease, idx) => {
                const Card = DiseaseCard as any;
                return <Card key={disease.id} disease={disease} index={idx} />;
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center"
            >
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-emerald-200" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-emerald-950">No diseases found</h3>
              <p className="text-emerald-800/60">Try adjusting your search terms or filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
