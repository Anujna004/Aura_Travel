import React from 'react';
import { Shield, Headphones, Globe, Star, Zap, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Heritage & Luxury Stays',
    description: 'Direct partnerships with authentic royal palaces, luxury houseboats, and eco-certified mountain chalets.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Headphones,
    title: '24/7 Dedicated AI Concierge',
    description: 'Instant Gemini AI assistance for train timings, puja aarti hours, local language phrases, and live route tips.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Pan-India Curated Circuit',
    description: 'Over 100+ destinations across 28 states, from Kashmir to Kanyakumari and Gujarat to Arunachal.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Star,
    title: 'Authentic Culinary Trails',
    description: 'Insider recommendations for Wazwan feasts, authentic Rajasthani thalis, Malabar seafood, and royal dining.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Instant Day-by-Day Plans',
    description: 'Generate customizable morning, afternoon, and evening timelines in seconds with transit optimization.',
    gradient: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Award,
    title: 'Transparent Local Pricing',
    description: 'Direct rupee rates with verified driver and monument pass quotes, free from hidden middleman markups.',
    gradient: 'from-rose-500 to-red-500',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            The AURA Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 font-heading tracking-tight">
            Why Travelers <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">Choose Us</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed font-light">
            Where next-generation artificial intelligence meets India's timeless warmth and hospitality.
          </p>
        </div>

        {/* 3-Column Features Grid with Hover Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] hover:border-amber-500/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Container with Pop Hover */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors font-heading">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
