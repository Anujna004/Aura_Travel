import React from 'react';
import { MapPin, Star, ArrowRight, Sparkles, Calendar, Heart } from 'lucide-react';
import { useTravel } from '../../context/TravelContext';

export function DestinationCard({ destination, onSelect, onClick }) {
  const { openItineraryPlanner, openChatbot } = useTravel();
  const handleSelect = onSelect || onClick;

  const imageSrc = destination.cardImage || destination.heroImage || destination.image;
  const regionName = destination.state || destination.continent || destination.region || destination.category;

  return (
    <div
      onClick={() => handleSelect && handleSelect(destination)}
      className="group relative rounded-3xl overflow-hidden border border-white/[0.08] bg-slate-900/60 flex flex-col transition-all duration-500 hover:-translate-y-2.5 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/15 cursor-pointer backdrop-blur-md"
    >
      {/* Visual Image Banner with Hover Zoom */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />

        {/* Shimmer Light Flare Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full glass-panel text-[11px] font-bold text-amber-300 border border-amber-500/30 uppercase tracking-wider backdrop-blur-md group-hover:border-amber-400/60 transition-colors">
            {destination.category || 'Luxury'}
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-panel text-xs font-bold text-white border border-white/15 backdrop-blur-md group-hover:bg-amber-500/20 transition-colors">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{destination.rating}</span>
            {destination.reviewsCount && (
              <span className="text-[10px] text-slate-300 font-normal">({destination.reviewsCount})</span>
            )}
          </div>
        </div>

        {/* Floating Location and Season Pin */}
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold tracking-wider uppercase drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{destination.state || destination.country} • {destination.continent}</span>
          </div>
          {(destination.bestTimeToVisit || destination.bestTime) && (
            <div className="glass-panel px-2.5 py-0.5 rounded-lg text-[11px] font-medium text-slate-200 border border-white/10 hidden sm:block">
              {destination.bestTimeToVisit ? destination.bestTimeToVisit.split(' ')[0] + ' ' + (destination.bestTimeToVisit.split(' ')[1] || '') : destination.bestTime}
            </div>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4 sm:gap-5">
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading group-hover:text-amber-300 transition-colors">
              {destination.name}
            </h3>
            <span className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all shrink-0">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 font-light">
            {destination.tagline || destination.description}
          </p>

          {/* Highlights Mini Pills */}
          {destination.highlights && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {destination.highlights.slice(0, 3).map((hl, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-white/[0.05] group-hover:border-amber-500/20 transition-colors"
                >
                  <Sparkles className="w-2.5 h-2.5 text-amber-400/80" />
                  {hl}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer Bar with Pricing & Action Buttons */}
        <div className="space-y-3 pt-3 border-t border-white/[0.08]">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="font-extrabold text-amber-300 text-sm">{destination.costLevel || '₹₹₹'}</span>
              <span className="text-slate-500">•</span>
              <span className="font-medium text-slate-200">{destination.avgDailyBudget || '₹3,500/day'}</span>
            </div>
            <span className="text-amber-400 font-semibold text-xs group-hover:underline">
              View Guide →
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openItineraryPlanner(destination.name);
              }}
              className="flex-1 py-2 px-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Plan</span>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                openChatbot(destination.name);
              }}
              className="flex-1 py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
