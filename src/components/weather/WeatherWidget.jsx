import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Search, MapPin, Loader2, Compass } from 'lucide-react';
import { fetchWeatherByCity } from '../../services/openWeatherService';
import { useTravel } from '../../context/TravelContext';

const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Drizzle: CloudRain,
  default: Sun,
};

export function WeatherWidget() {
  const { currentWeather, weatherLoading, handleManualWeatherSearch, convertTemp, tempUnit, toggleTempUnit } = useTravel();
  const [cityInput, setCityInput] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (customCity) => {
    const targetCity = customCity || cityInput.trim();
    if (!targetCity) return;
    setLocalLoading(true);
    setError('');
    try {
      if (handleManualWeatherSearch) {
        await handleManualWeatherSearch(targetCity);
      } else {
        await fetchWeatherByCity(targetCity);
      }
      setCityInput('');
    } catch (err) {
      setError(err.message || 'City not found. Please try another destination.');
    } finally {
      setLocalLoading(false);
    }
  };

  const weather = currentWeather || {
    cityName: 'Srinagar, Kashmir',
    temp: 16,
    feels_like: 15,
    condition: 'Partly Cloudy',
    description: 'cool mountain breeze',
    humidity: 58,
    wind: 9,
    high: 19,
    low: 7
  };

  const WeatherIcon = weather ? (weatherIcons[weather.condition] || weatherIcons.default) : Sun;
  const isLoading = weatherLoading || localLoading;

  const quickCities = ['Kashmir', 'Jaipur', 'Goa', 'Ladakh', 'Kerala', 'Varanasi', 'Manali'];

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-14">
          <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
            Live Meteorological Radar
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 font-heading tracking-tight">
            Destination <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400">Weather Radar</span>
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-light">
            Monitor real-time temperatures, atmospheric conditions, and wind velocity across Indian destinations before you pack.
          </p>
        </div>

        {/* Quick City Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs text-slate-400 font-medium">Quick Radar:</span>
          {quickCities.map((c) => (
            <button
              key={c}
              onClick={() => handleSearch(c)}
              className="px-3 py-1 rounded-full glass-panel-light text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all cursor-pointer"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Search Bar & Unit Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto mb-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2 w-full flex-1"
          >
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Search Indian city (e.g. Srinagar, Leh, Jaipur, Kochi, Goa)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-800/80 border border-white/[0.1] text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all shadow-lg"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer shrink-0"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </form>

          {toggleTempUnit && (
            <button
              onClick={toggleTempUnit}
              className="px-4 py-3 rounded-2xl glass-panel text-xs font-bold text-amber-300 border border-white/10 hover:border-amber-500/30 transition-all cursor-pointer shrink-0"
              title="Toggle °C / °F"
            >
              °{tempUnit || 'C'} / °{tempUnit === 'C' ? 'F' : 'C'}
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="text-center text-xs sm:text-sm text-rose-400 mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 max-w-lg mx-auto">
            {error}
          </div>
        )}

        {/* Weather Display */}
        {weather && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.1] shadow-2xl transition-all duration-500 hover:border-cyan-500/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Main Temp */}
              <div className="text-center md:text-left space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-lg">
                    <WeatherIcon className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white font-heading">
                    {convertTemp ? convertTemp(weather.temp) : Math.round(weather.temp)}°{tempUnit || 'C'}
                  </span>
                </div>
                <p className="text-cyan-300 text-base sm:text-lg font-medium capitalize pt-1">
                  {weather.description || weather.condition}
                </p>
                <p className="text-slate-300 text-sm sm:text-base flex items-center justify-center md:justify-start gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{weather.cityName || 'Detected Indian Location'}</span>
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-28 bg-white/[0.1]" />

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4 w-full md:w-auto flex-1 max-w-md">
                {[
                  {
                    icon: Thermometer,
                    label: 'Feels Like',
                    value: `${convertTemp ? convertTemp(weather.feels_like) : Math.round(weather.feels_like)}°${tempUnit || 'C'}`
                  },
                  { icon: Droplets, label: 'Humidity', value: `${weather.humidity || 55}%` },
                  { icon: Wind, label: 'Wind Velocity', value: `${weather.wind || 10} km/h` },
                  {
                    icon: Sun,
                    label: 'Daily Range',
                    value: weather.high !== undefined ? `${convertTemp ? convertTemp(weather.high) : weather.high}° / ${convertTemp ? convertTemp(weather.low) : weather.low}°` : '28° / 18°'
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/50 border border-white/[0.04]">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">{item.label}</p>
                      <p className="text-xs sm:text-sm text-white font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
