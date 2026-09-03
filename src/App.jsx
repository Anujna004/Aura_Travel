import React from 'react';
import { TravelProvider } from './context/TravelContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { DestinationExplorer } from './components/destinations/DestinationExplorer';
import { TravelStyleSection } from './components/sections/TravelStyleSection';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { AITripPlannerBanner } from './components/sections/AITripPlannerBanner';
import { WeatherWidget } from './components/weather/WeatherWidget';
import { DestinationDetailModal } from './components/destinations/DestinationDetailModal';
import { AIChatbotModal } from './components/ai/AIChatbotModal';
import { ItineraryPlannerModal } from './components/itinerary/ItineraryPlannerModal';
import { Footer } from './components/layout/Footer';

export function App() {
  return (
    <TravelProvider>
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* Global Navigation */}
        <Navbar />

        {/* Spacious & Structured Landing Page Story Flow */}
        <main>
          {/* Section 1: 100vh True Cinematic Video Hero */}
          <HeroSection />

          <div className="section-divider" />

          {/* Section 2: Featured Destinations (2-Column Desktop Grid) */}
          <DestinationExplorer />

          <div className="section-divider" />

          {/* Section 3: Explore by Travel Style Visual Categories */}
          <TravelStyleSection />

          <div className="section-divider" />

          {/* Section 4: Why Choose AURA Travel */}
          <WhyChooseUs />

          <div className="section-divider" />

          {/* Section 5: AI Day-by-Day Trip Planner Callout */}
          <AITripPlannerBanner />

          <div className="section-divider" />

          {/* Section 6: Real-Time OpenWeather Radar Banner */}
          <WeatherWidget />
        </main>

        {/* Global Modals & Floating Drawers */}
        <DestinationDetailModal />
        <AIChatbotModal />
        <ItineraryPlannerModal />

        {/* Footer */}
        <Footer />

      </div>
    </TravelProvider>
  );
}

export default App;
