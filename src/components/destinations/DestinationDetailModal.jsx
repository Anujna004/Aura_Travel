import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { X, MapPin, Star, Clock, DollarSign, Sun, Users, Sparkles } from 'lucide-react';
import { FamousPlaceCard } from '../places/FamousPlaceCard';

export function DestinationDetailModal() {
  const {
    activeDestination,
    selectedDestination,
    closeDestinationDetail,
    setSelectedDestination,
    openChatbot,
    openItineraryPlanner
  } = useTravel();

  const dest = activeDestination || selectedDestination;
  if (!dest) return null;

  const handleClose = () => {
    if (closeDestinationDetail) closeDestinationDetail();
    if (setSelectedDestination) setSelectedDestination(null);
  };

  const imageSrc = dest.heroImage || dest.cardImage || dest.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto rounded-3xl glass-panel border border-white/[0.12] shadow-2xl bg-[#0B0F17]/95 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 backdrop-blur-lg flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/20 cursor-pointer shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image Section */}
          <div className="relative h-64 sm:h-80 lg:h-[380px] w-full overflow-hidden">
            <img
              src={imageSrc}
              alt={dest.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent opacity-70" />

            {/* Overlay Info */}
            <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                <span className="px-3.5 py-1 rounded-full glass-panel text-xs font-bold text-amber-300 border border-amber-500/30">
                  {dest.category}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel text-xs font-bold text-white border border-white/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {dest.rating}
                  {dest.reviewsCount && (
                    <span className="text-slate-300 font-normal">({dest.reviewsCount} reviews)</span>
                  )}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">{dest.name}</h2>
              <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-semibold mt-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{dest.state ? `${dest.state}, India` : `${dest.country}`} • {dest.continent}</span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-8 lg:p-10 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {[
                { icon: DollarSign, label: 'Est. Daily Budget', value: dest.avgDailyBudget || `${dest.costLevel || '₹₹₹'} Tier`, color: 'text-emerald-400' },
                { icon: Clock, label: 'Best Time to Visit', value: dest.bestTimeToVisit || dest.bestTime || 'Oct - Mar', color: 'text-cyan-400' },
                { icon: Sun, label: 'Language', value: dest.language ? dest.language.split(',')[0] : 'Hindi, English', color: 'text-amber-400' },
                { icon: Users, label: 'Ideal Group', value: 'Family / Couples / Solo', color: 'text-purple-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-800/50 rounded-2xl p-4 border border-white/[0.06] flex flex-col justify-between">
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</p>
                    <p className="text-sm sm:text-base font-bold text-white mt-0.5 font-heading truncate">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-2.5">
              <h3 className="text-xl font-bold text-white font-heading">About {dest.name}</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">{dest.description}</p>
            </div>

            {/* Highlights */}
            {dest.highlights && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white font-heading">Curated Experiences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {dest.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/40 border border-white/[0.05] text-xs sm:text-sm text-slate-200">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      <span className="font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Famous Places */}
            {dest.famousPlaces && dest.famousPlaces.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white font-heading">Famous Landmarks & Hotspots</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {dest.famousPlaces.map((place, i) => (
                    <FamousPlaceCard key={i} place={place} />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons Footer */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  handleClose();
                  openItineraryPlanner(dest.name);
                }}
                className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                Generate AI Itinerary for {dest.name}
              </button>
              <button
                onClick={() => {
                  handleClose();
                  openChatbot(dest.name);
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 glass-panel text-slate-200 font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-amber-500/40 hover:scale-105 transition-all cursor-pointer"
              >
                Ask AI Concierge About {dest.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
