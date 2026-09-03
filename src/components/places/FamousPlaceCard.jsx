import React from 'react';
import { MapPin, Clock, Sparkles } from 'lucide-react';

export function FamousPlaceCard({ place, onAskAI }) {
  return (
    <div className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-800/40 border border-white/[0.06] hover:border-amber-500/40 hover:bg-slate-800/70 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-md">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
      </div>

      <div className="flex flex-col justify-center min-w-0 space-y-1.5 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors truncate font-heading">
            {place.name}
          </h4>
          {place.duration && (
            <span className="text-[10px] text-amber-400/90 font-medium px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 shrink-0 hidden sm:inline-block">
              {place.duration}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed font-light">
          {place.description}
        </p>

        {place.tip && (
          <p className="text-[11px] text-amber-300/90 line-clamp-1 italic">
            💡 {place.tip}
          </p>
        )}
      </div>
    </div>
  );
}
