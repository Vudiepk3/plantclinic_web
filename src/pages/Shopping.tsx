import React, { useState, useEffect, useMemo } from 'react';
import MainLayout from '../layouts/MainLayout';
import ShoppingCard from '../components/ShoppingCard';
import { Search, Package, Sparkles } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { fetchProducts, type Product } from '../services/dataService';

const categories = ['All', 'Organic Control', 'Chemical Control', 'Tools', 'Nutrients'];

export default function Shopping() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProductData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return productData.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [productData, debouncedSearch, selectedCategory]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" /> Recommended Products
          </div>
          <h1 className="text-6xl font-bold text-emerald-950 mb-6">Expert <span className="text-emerald-600">Toolset</span></h1>
          <p className="text-xl text-emerald-800/60">
            Hand-picked products to help you detect, prevent, and treat plant diseases effectively.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-300 w-6 h-6" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-emerald-100 rounded-[20px] py-4 pl-16 pr-8 focus:ring-2 focus:ring-emerald-500 text-emerald-950 transition-all shadow-sm placeholder:text-emerald-300"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${selectedCategory === cat
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white border-emerald-100 text-emerald-800/60 hover:border-emerald-500'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-32 text-center animate-pulse">
            <Package className="w-20 h-20 text-emerald-100 mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl font-bold mb-2 text-emerald-950">Loading toolset...</h3>
            <p className="text-emerald-800/60">Fetching safe products for you...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product, idx) => {
              const Card = ShoppingCard as any;
              return <Card key={product.id} product={product} index={idx} />;
            })}
          </div>
        ) : (
          <div className="py-32 text-center">
            <Package className="w-20 h-20 text-emerald-100 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-2 text-emerald-950">No products found</h3>
            <p className="text-emerald-800/60">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
