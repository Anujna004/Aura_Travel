import React from 'react';
import { Compass, Mail, Phone, MapPin, ArrowUp, Globe } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070A0F] border-t border-white/[0.08] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Brand Col (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight font-heading">
                AURA<span className="text-amber-400">.</span>travel
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              Pioneering hyper-personalized luxury journeys across Incredible India with Google Gemini AI intelligence and royal concierge curation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Social links */}
              {[
                { name: 'Instagram', svg: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                ) },
                { name: 'X', svg: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                ) },
                { name: 'Global', svg: (
                  <Globe className="w-4 h-4" />
                ) }
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={item.name}
                  className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all cursor-pointer"
                >
                  {item.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Top Indian Sanctuaries
            </h4>
            <ul className="space-y-2.5">
              {['Kashmir Valley', 'Jaipur Pink City', 'Kerala Backwaters', 'Ladakh & Pangong', 'Varanasi Ghats', 'Goa Shores'].map((link) => (
                <li key={link}>
                  <a href="#destinations" className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Curated Travel Styles
            </h4>
            <ul className="space-y-2.5">
              {['Himalayan Treks', 'Royal Palace Stays', 'Backwater Houseboats', 'Sacred Maha Aarti', 'Bengal Tiger Safaris', 'Coral Atolls'].map((link) => (
                <li key={link}>
                  <a href="#styles" className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              India Concierge
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>concierge@aura.travel</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 (800) 180-AURA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>New Delhi • Srinagar • Bengaluru</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 lg:mt-16 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 AURA Travel India. All rights reserved. Crafted for incredible journeys.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security</a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all cursor-pointer ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
