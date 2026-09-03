import React, { useState } from 'react';
import { Calendar, Sun, Moon, Sunrise, Clock, Lightbulb, MapPin, Download, Share2, DollarSign, CheckCircle2 } from 'lucide-react';

export const ItineraryTimeline = ({ itinerary }) => {
  const [activeDayTab, setActiveDayTab] = useState(1);

  if (!itinerary || !itinerary.days || itinerary.days.length === 0) return null;

  const currentDayData = itinerary.days.find((d) => d.dayNumber === activeDayTab) || itinerary.days[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Itinerary Header Vitals */}
      <div className="p-6 rounded-3xl glass-panel border border-amber-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Calendar className="w-4 h-4" />
              <span>Structured AI Itinerary</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {itinerary.tripTitle}
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl glass-panel-light hover:border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

        {/* Highlights Strip */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/10 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 font-semibold text-amber-300">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Budget: {itinerary.estimatedBudget}</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>{itinerary.daysCount} Custom Scheduled Days</span>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {itinerary.days.map((day) => (
          <button
            key={day.dayNumber}
            onClick={() => setActiveDayTab(day.dayNumber)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeDayTab === day.dayNumber
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                : 'glass-panel-light text-slate-300 hover:text-white'
            }`}
          >
            Day {day.dayNumber}
          </button>
        ))}
      </div>

      {/* Day Theme Title */}
      <div className="px-2">
        <h4 className="text-lg font-bold text-amber-300 font-heading">
          {currentDayData.theme}
        </h4>
      </div>

      {/* Timeline Time Slots (Morning, Afternoon, Evening) */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-cyan-500 before:to-indigo-500">
        
        {/* Morning Time Slot */}
        {currentDayData.slots.morning && (
          <div className="relative pl-12 sm:pl-16">
            <div className="absolute left-3.5 sm:left-5 top-1.5 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg">
              <Sunrise className="w-3.5 h-3.5" />
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3 glass-card-hover">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                  🌅 Morning (08:30 - 12:00)
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentDayData.slots.morning.duration}
                </span>
              </div>

              <h5 className="text-xl font-bold text-white font-heading">
                {currentDayData.slots.morning.title}
              </h5>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {currentDayData.slots.morning.activity}
              </p>

              {currentDayData.slots.morning.tip && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Morning Tip:</strong> {currentDayData.slots.morning.tip}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Afternoon Time Slot */}
        {currentDayData.slots.afternoon && (
          <div className="relative pl-12 sm:pl-16">
            <div className="absolute left-3.5 sm:left-5 top-1.5 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg">
              <Sun className="w-3.5 h-3.5" />
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3 glass-card-hover">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
                  ☀️ Afternoon (12:30 - 17:00)
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentDayData.slots.afternoon.duration}
                </span>
              </div>

              <h5 className="text-xl font-bold text-white font-heading">
                {currentDayData.slots.afternoon.title}
              </h5>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {currentDayData.slots.afternoon.activity}
              </p>

              {currentDayData.slots.afternoon.tip && (
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs flex items-start gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Afternoon Tip:</strong> {currentDayData.slots.afternoon.tip}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Evening Time Slot */}
        {currentDayData.slots.evening && (
          <div className="relative pl-12 sm:pl-16">
            <div className="absolute left-3.5 sm:left-5 top-1.5 -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg">
              <Moon className="w-3.5 h-3.5" />
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3 glass-card-hover">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
                  🌙 Evening & Night (18:00 - 22:00)
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentDayData.slots.evening.duration}
                </span>
              </div>

              <h5 className="text-xl font-bold text-white font-heading">
                {currentDayData.slots.evening.title}
              </h5>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {currentDayData.slots.evening.activity}
              </p>

              {currentDayData.slots.evening.tip && (
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs flex items-start gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>Evening Tip:</strong> {currentDayData.slots.evening.tip}</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
