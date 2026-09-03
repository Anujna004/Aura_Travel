import React, { useState, useEffect } from 'react';
import { useTravelContext } from '../../context/TravelContext';
import { Sparkles, Menu, X, Compass, Map, MessageSquare } from 'lucide-react';

export function Navbar() {
  const { setChatbotOpen, setItineraryModalOpen } = useTravelContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight font-heading">
              AURA<span className="text-amber-400">.</span>travel
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#destinations" className="text-sm text-slate-300 hover:text-amber-400 transition-colors">
              Destinations
            </a>
            <a href="#styles" className="text-sm text-slate-300 hover:text-amber-400 transition-colors">
              Travel Styles
            </a>
            <button
              onClick={() => setItineraryModalOpen(true)}
              className="text-sm text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Map className="w-3.5 h-3.5" />
              Plan Trip
            </button>
            <button
              onClick={() => setChatbotOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-shadow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Assistant
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-t border-white/[0.06] px-4 pb-5 pt-2 space-y-3">
          <a href="#destinations" className="block py-2.5 text-sm text-slate-300 hover:text-amber-400">
            Destinations
          </a>
          <a href="#styles" className="block py-2.5 text-sm text-slate-300 hover:text-amber-400">
            Travel Styles
          </a>
          <button
            onClick={() => { setItineraryModalOpen(true); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2.5 text-sm text-slate-300 hover:text-amber-400"
          >
            Plan Trip
          </button>
          <button
            onClick={() => { setChatbotOpen(true); setMobileMenuOpen(false); }}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Assistant
          </button>
        </div>
      )}
    </nav>
  );
}
