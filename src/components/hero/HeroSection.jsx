import React, { useRef, useState, useEffect } from 'react';
import { useTravel } from '../../context/TravelContext';
import { ChevronDown, Sparkles, MapPin, Search } from 'lucide-react';

export function HeroSection() {
  const { searchQuery, setSearchQuery, setChatbotOpen, openItineraryPlanner } = useTravel();

  // Dual video refs for seamless infinite cross-fade looping
  const videoRefA = useRef(null);
  const videoRefB = useRef(null);
  const [activePlayer, setActivePlayer] = useState('A'); // 'A' or 'B'
  const isTransitioningRef = useRef(false);

  // Direct local video file sources
  const videoSources = [
    "/hero-video.mp4",
    "/hero-vedio.mp4"
  ];

  const scrollToExplorer = () => {
    const explorerEl = document.getElementById('destinations');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Force immediate video play on mount with zero delay
    if (videoRefA.current) {
      videoRefA.current.play().catch(() => {});
    }
  }, []);

  // Time update listener on Player A: triggers seamless crossfade to Player B before reaching end
  const handleTimeUpdateA = () => {
    const vA = videoRefA.current;
    const vB = videoRefB.current;
    if (!vA || !vB || !vA.duration) return;

    // Cross-fade 1.5 seconds before video A ends
    if (activePlayer === 'A' && vA.currentTime >= vA.duration - 1.5 && !isTransitioningRef.current) {
      isTransitioningRef.current = true;
      vB.currentTime = 0;
      vB.play().then(() => {
        setActivePlayer('B');
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 1200);
      }).catch(() => {
        isTransitioningRef.current = false;
      });
    }
  };

  // Time update listener on Player B: triggers seamless crossfade to Player A before reaching end
  const handleTimeUpdateB = () => {
    const vA = videoRefA.current;
    const vB = videoRefB.current;
    if (!vA || !vB || !vB.duration) return;

    // Cross-fade 1.5 seconds before video B ends
    if (activePlayer === 'B' && vB.currentTime >= vB.duration - 1.5 && !isTransitioningRef.current) {
      isTransitioningRef.current = true;
      vA.currentTime = 0;
      vA.play().then(() => {
        setActivePlayer('A');
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 1200);
      }).catch(() => {
        isTransitioningRef.current = false;
      });
    }
  };

  return (
    <section className="relative min-h-screen min-h-[100dvh] w-full overflow-hidden flex items-center justify-center pt-20 pb-16">
      {/* Pure Direct Video Background (NO Poster Image, Instant Local Video Playback) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0B0F17]">
        {/* Video Player A */}
        <video
          ref={videoRefA}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdateA}
          className={`absolute inset-0 w-full h-full object-cover brightness-[0.88] contrast-[1.05] saturate-[1.1] transition-opacity duration-1000 ease-in-out pointer-events-none ${
            activePlayer === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {videoSources.map((src, i) => (
            <source key={i} src={src} type="video/mp4" />
          ))}
        </video>

        {/* Video Player B (Preloaded Standby for Seamless Crossfade) */}
        <video
          ref={videoRefB}
          loop
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdateB}
          className={`absolute inset-0 w-full h-full object-cover brightness-[0.88] contrast-[1.05] saturate-[1.1] transition-opacity duration-1000 ease-in-out pointer-events-none ${
            activePlayer === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {videoSources.map((src, i) => (
            <source key={i} src={src} type="video/mp4" />
          ))}
        </video>
        
        {/* Subtle, Crisp Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/35 to-black/30 pointer-events-none z-20" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-30 text-center px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto mt-6">
        
        {/* Editorial Subtitle Pill */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-panel text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 border border-amber-500/30 shadow-2xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Next-Generation AI Travel Concierge for India</span>
        </div>

        {/* Main Cinematic Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.08] mb-6 font-heading tracking-tight drop-shadow-2xl">
          Discover the Soul of
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500">
            Incredible India
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-lg">
          From the snow-clad peaks of Kashmir and golden forts of Rajasthan to the serene Kerala backwaters and sacred Ghats of Varanasi — planned seamlessly with Google Gemini AI.
        </p>

        {/* Multi-Criteria Quick Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="glass-panel p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center gap-2 backdrop-blur-xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="text"
                placeholder="Search Indian destinations (e.g., Kashmir, Jaipur, Kerala, Goa, Ladakh)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={scrollToExplorer}
                className="w-full bg-transparent border-none outline-none text-white placeholder-slate-300 text-sm sm:text-base font-medium"
              />
            </div>
            <button
              onClick={scrollToExplorer}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl sm:rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/25 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Sanctuaries</span>
            </button>
          </div>
        </div>

        {/* Quick Popular Search Chips */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-200 mb-10">
          <span className="text-slate-300 font-medium">Popular searches:</span>
          {['Kashmir', 'Jaipur', 'Kerala', 'Goa', 'Ladakh', 'Varanasi', 'Udaipur'].map((place) => (
            <button
              key={place}
              onClick={() => {
                setSearchQuery(place);
                scrollToExplorer();
              }}
              className="px-3.5 py-1.5 rounded-full glass-panel hover:border-amber-500/60 hover:text-amber-300 hover:bg-amber-500/15 transition-all cursor-pointer text-xs font-semibold shadow-md backdrop-blur-md"
            >
              {place}
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            onClick={() => setChatbotOpen(true)}
            className="w-full sm:w-auto group flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 fill-slate-950" />
            <span>Start AI Trip Concierge</span>
            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button
            onClick={() => openItineraryPlanner('Kashmir Valley')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl border border-white/20 glass-panel text-white font-semibold text-base hover:bg-white/10 hover:border-amber-500/40 hover:scale-105 transition-all cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>Generate Custom Itinerary</span>
          </button>
        </div>

      </div>

      {/* Downward Scroll Indicator */}
      <button
        onClick={scrollToExplorer}
        aria-label="Scroll down to explore destinations"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors animate-bounce cursor-pointer drop-shadow"
      >
        <span className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold">Explore India</span>
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
}
