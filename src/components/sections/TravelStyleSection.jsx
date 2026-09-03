import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const travelStyles = [
  {
    id: 1,
    title: 'Himalayan & Alpine Treks',
    category: 'Himalayan Escapes',
    description: 'Snowy high-altitude passes, pine valley trails, and ski gondolas in Kashmir & Himachal.',
    icon: '🏔️',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-orange-500/20 to-amber-500/20',
    borderColor: 'border-orange-500/30',
  },
  {
    id: 2,
    title: 'Royal Haveli & Palace Stays',
    category: 'Royal Heritage',
    description: 'Grand Rajputana fortresses, floating marble palaces, and royal Mewar hospitality.',
    icon: '👑',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLC_3G9fxUpaZIQ_ePLhzQ-bC0lLoHmRAQtR5sCvI-TQ&s=10',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'border-amber-500/30',
  },
  {
    id: 3,
    title: 'Backwaters & Ayurvedic Wellness',
    category: 'Nature & Wilderness',
    description: 'Serene Kettuvallam houseboats, fragrant spice gardens, and ancient Kerala therapies.',
    icon: '🛶',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 4,
    title: 'Spiritual & Sacred Ghats',
    category: 'Spiritual & Culture',
    description: 'Maha Aarti fire rituals along the Ganges, ancient temple corridors, and meditation ashrams.',
    icon: '🪔',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcQLk3UX1A4YToWsH4BauEj3rZa-oKav8Uoo4K1bTCfg&s=10',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
  },
  {
    id: 5,
    title: 'Bengal Tiger & Jungle Safaris',
    category: 'Nature & Wilderness',
    description: '4x4 game drives across Ranthambore, Jim Corbett, and Kaziranga rhino reserves.',
    icon: '🐅',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    id: 6,
    title: 'Tropical Beach & Coral Isles',
    category: 'Coastal & Beach',
    description: 'Golden sunsets in Goa and crystal turquoise coral lagoons in the Andaman Islands.',
    icon: '🏖️',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
  },
];

export function TravelStyleSection() {
  const { setSelectedCategory, setSelectedContinent, setSearchQuery } = useTravel();

  const handleExploreStyle = (style) => {
    if (setSelectedCategory) {
      setSelectedCategory(style.category);
    }
    if (setSelectedContinent) {
      setSelectedContinent('All Regions');
    }
    if (setSearchQuery) {
      setSearchQuery('');
    }
    const explorerEl = document.getElementById('destinations');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="styles" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-10 relative overflow-hidden bg-gradient-to-b from-transparent via-slate-900/40 to-transparent">
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            Curated Experiences
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 font-heading tracking-tight">
            Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">Indian Travel Style</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed font-light">
            Tap any travel style to filter our curated sanctuaries by the mood and spirit you wish to experience across India.
          </p>
        </div>

        {/* 3-Column Travel Style Grid with Click-to-Filter Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {travelStyles.map((style) => (
            <div
              key={style.id}
              onClick={() => handleExploreStyle(style)}
              className={`group relative rounded-3xl overflow-hidden border ${style.borderColor} bg-gradient-to-br ${style.gradient} cursor-pointer min-h-[320px] sm:min-h-[360px] flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20`}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0">
                <img
                  src={style.image}
                  alt={style.title}
                  className="w-full h-full object-cover opacity-35 group-hover:opacity-55 group-hover:scale-110 transition-all duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/75 to-transparent" />
              </div>

              {/* Shimmer Light Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 space-y-2.5">
                <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-2xl mb-3 border border-white/20 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all shadow-lg">
                  {style.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                  {style.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 font-light">
                  {style.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase group-hover:translate-x-2 transition-transform">
                  <span>Explore {style.category}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
