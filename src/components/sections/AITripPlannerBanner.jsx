import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { Sparkles, ArrowRight, Calendar, MapPin, Brain } from 'lucide-react';

export function AITripPlannerBanner() {
  const { setItineraryModalOpen, setChatbotOpen, openItineraryPlanner } = useTravel();

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="glass-panel rounded-3xl border border-white/[0.1] overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Left Content (7 columns on desktop) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6 w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                Next-Gen Indian AI Travel Engine
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 font-heading leading-tight tracking-tight">
                Your Dream India Tour,{' '}
                <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
                  Engineered by AI
                </span>
              </h2>

              <p className="text-slate-300 mb-8 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-light">
                Tell us your destination, travel pace, and budget. Our Gemini-powered AI builds a custom day-by-day itinerary with sunrise viewpoints, authentic thali dining, temple timings, and local transit advice.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {[
                  { icon: Calendar, label: 'Custom Day-by-Day Timeline' },
                  { icon: MapPin, label: 'Secret Viewpoints & Local Eats' },
                  { icon: Brain, label: 'Gemini AI Contextual Insights' },
                ].map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800/80 text-slate-200 border border-white/[0.08]"
                  >
                    <item.icon className="w-4 h-4 text-amber-400" />
                    {item.label}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3.5">
                <button
                  onClick={() => openItineraryPlanner ? openItineraryPlanner('Kashmir Valley') : setItineraryModalOpen(true)}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Plan My India Itinerary</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setChatbotOpen(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/20 glass-panel text-slate-200 font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-amber-500/40 hover:scale-105 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Ask AI Concierge</span>
                </button>
              </div>
            </div>

            {/* Right Visual (5 columns on desktop) */}
            <div className="lg:col-span-5 relative hidden lg:block min-h-[460px]">
              <img
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80"
                alt="Rajasthan Palace Heritage"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#131B2A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131B2A]/80 via-transparent to-transparent" />

              {/* Floating Glass Highlight Card */}
              <div className="absolute bottom-6 right-6 left-6 glass-panel rounded-2xl p-4.5 border border-white/15 backdrop-blur-xl">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">AI Local Insight</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  "Board the Shikara at Dal Lake at 5:30 AM to witness the mystical floating market before tour crowds arrive!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
