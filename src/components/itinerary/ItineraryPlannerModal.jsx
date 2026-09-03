import React, { useState, useEffect } from 'react';
import { X, Calendar, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTravel } from '../../context/TravelContext';
import { generateAIItinerary } from '../../services/geminiService';
import { ItineraryTimeline } from './ItineraryTimeline';

export const ItineraryPlannerModal = () => {
  const {
    isItineraryPlannerOpen,
    itineraryModalOpen,
    setIsItineraryPlannerOpen,
    setItineraryModalOpen,
    itineraryTargetDestination,
    generatedItinerary,
    setGeneratedItinerary,
    destinations
  } = useTravel();

  const isOpen = isItineraryPlannerOpen || itineraryModalOpen;
  const [selectedDestination, setSelectedDestination] = useState(itineraryTargetDestination || 'Kashmir Valley');
  const [days, setDays] = useState(3);
  const [style, setStyle] = useState('Balanced');
  const [budget, setBudget] = useState('Moderate');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itineraryTargetDestination) {
      setSelectedDestination(itineraryTargetDestination);
    }
  }, [itineraryTargetDestination]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (setIsItineraryPlannerOpen) setIsItineraryPlannerOpen(false);
    if (setItineraryModalOpen) setItineraryModalOpen(false);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateAIItinerary({
        destination: selectedDestination,
        days: parseInt(days, 10),
        style,
        budget
      });

      setGeneratedItinerary(result);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if confetti fails
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0B0F17] rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 glass-nav border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base sm:text-lg font-heading flex items-center gap-2">
                <span>AI Day-by-Day Itinerary Planner</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold border border-amber-500/30">
                  Gemini AI
                </span>
              </h3>
              <span className="text-xs text-slate-400">Custom timelines with morning, afternoon & evening activities tailored for India</span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Controls Wizard Form */}
          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Destination Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Select Indian Destination
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {(destinations || []).map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.state ? `${d.state}` : d.continent})
                    </option>
                  ))}
                </select>
              </div>

              {/* Trip Duration Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Duration (Days)
                  </label>
                  <span className="text-sm font-extrabold text-amber-400">{days} Days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>1 Day</span>
                  <span>3 Days</span>
                  <span>5 Days</span>
                  <span>7 Days</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Travel Style Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Travel Vibe / Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Balanced', 'Romantic', 'Heritage', 'Relaxed', 'Adventure', 'Culinary'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        style === s
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                          : 'glass-panel-light text-slate-300 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Level Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Budget Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Budget', 'Moderate', 'Luxury'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        budget === b
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                          : 'glass-panel-light text-slate-300 hover:text-white'
                      }`}
                    >
                      {b === 'Budget' ? '₹ Budget' : b === 'Moderate' ? '✨ Moderate' : '👑 Luxury'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/25 hover:scale-[1.01] cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Synthesizing Day-by-Day Itinerary for {selectedDestination}...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 fill-slate-950" />
                  <span>Generate Custom Day-by-Day Timeline</span>
                </>
              )}
            </button>
          </div>

          {/* Render Generated Itinerary Timeline */}
          {generatedItinerary && (
            <div className="pt-4 border-t border-white/10">
              <ItineraryTimeline itinerary={generatedItinerary} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
