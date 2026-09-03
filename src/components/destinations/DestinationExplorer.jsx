import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { CONTINENTS, CATEGORIES } from '../../data/destinationsData';
import { DestinationCard } from './DestinationCard';
import { Search, Compass, SlidersHorizontal, MapPin, Sparkles } from 'lucide-react';

export function DestinationExplorer() {
  const {
    destinations,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedContinent,
    setSelectedContinent,
    sortBy,
    setSortBy,
    openDestinationDetail
  } = useTravel();

  const filteredDestinations = (destinations || [])
    .filter((dest) => {
      const matchesContinent =
        !selectedContinent || selectedContinent === 'All Regions' || dest.continent === selectedContinent;
      const matchesCategory =
        !selectedCategory || selectedCategory === 'All' || dest.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        dest.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dest.highlights && dest.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesContinent && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedContinent('All Regions');
    setSortBy('trending');
  };

  return (
    <section id="destinations" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-cyan-500/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <Compass className="w-3.5 h-3.5" />
            Curated Indian Sanctuaries
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 font-heading tracking-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">Incredible India</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed font-light">
            Discover royal desert fortresses, misty tea estates, sacred rivers, and high-altitude Himalayan passes with AI concierge intelligence.
          </p>
        </div>

        {/* Filter Controls Row: Region, Search & Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 bg-slate-900/60 p-3.5 sm:p-4 rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-xl">
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Zone:</span>
            </span>
            {CONTINENTS.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedContinent(reg)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  selectedContinent === reg
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-105 font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-white/[0.06]'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search state, city, landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/90 border border-white/[0.1] text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 border border-white/15 rounded-xl px-3 py-2 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="trending">🔥 Trending</option>
                <option value="rating">⭐ Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Controls Row 2: Category Style Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 sm:mb-12 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Theme:</span>
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/50 shadow-md scale-105'
                  : 'glass-panel-light text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Destination Grid: 3-column on Desktop, 2-column on Tablet, 1-column on Mobile */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8 xl:gap-9">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onSelect={openDestinationDetail}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-3xl glass-panel border border-white/[0.08] max-w-xl mx-auto my-12 space-y-4">
            <p className="text-slate-300 text-base sm:text-lg font-medium">No Indian destinations found matching your filters.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
