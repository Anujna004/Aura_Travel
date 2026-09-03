# AURA TRAVEL — Luxury Indian Travel & AI Concierge

> **Live Application Demo:** [https://aura-travel-nine.vercel.app/](https://aura-travel-nine.vercel.app/)  
> **Tech Stack:** React 19, JavaScript (ES6+), HTML5, Tailwind CSS v4, Vite 8, Google Gemini AI API, OpenWeather API, Canvas Confetti, and Lucide Icons.

---

## 🌟 1. Project Overview

**AURA Travel** is an editorial-grade, luxury travel web application engineered to showcase the soul of **Incredible India**. It combines a direct high-definition looping video hero landing, dynamic Indian destination exploration, real-time meteorological weather radar, and intelligent conversational assistance & day-by-day itinerary synthesis powered by **Google Gemini AI**.

Designed with **spacious luxury proportions**, smooth **Google Fonts typography** (*Plus Jakarta Sans*, *Outfit*, and *Playfair Display*), custom glassmorphism, and responsive **3-column grid layouts** across desktop, tablet, and mobile viewports.

---

## 📸 2. Application UI Showcase

```
+-----------------------------------------------------------------------------------+
|  AURA.travel        [Destinations]   [Travel Styles]   [Plan Trip]   [AI Assistant] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|           [✨ NEXT-GENERATION AI TRAVEL CONCIERGE FOR INDIA]                      |
|                                                                                   |
|                   Discover the Soul of INCREDIBLE INDIA                           |
|        Planned seamlessly with Google Gemini AI & Real-time Weather               |
|                                                                                   |
|      [ 🔍 Search Indian destinations (Kashmir, Jaipur, Kerala, Goa)... ] [Explore]|
|                                                                                   |
|             [ ✨ Start AI Trip Concierge ]   [ 📍 Generate Custom Itinerary ]      |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   🏛️ DESTINATION EXPLORER (3-Column Desktop / Tablet / Mobile Responsive)         |
|   +------------------------+ +------------------------+ +-----------------------+ |
|   | 🏔️ Kashmir Valley      | | 👑 Jaipur Pink City    | | 🛶 Kerala Backwaters  | |
|   | Starting: ₹4,500/day   | | Starting: ₹3,500/day   | | Starting: ₹4,000/day  | |
|   | [AI Plan] [Ask AI]     | | [AI Plan] [Ask AI]     | | [AI Plan] [Ask AI]    | |
|   +------------------------+ +------------------------+ +-----------------------+ |
|                                                                                   |
|   🌤️ DESTINATION WEATHER RADAR (Live °C / °F, Wind Speed, Humidity & Forecasts)   |
|   🤖 AI CONCIERGE DRAWER & STRUCTURED DAY-BY-DAY ITINERARY PLANNER TIMELINE       |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 🚀 3. Features Completed

### 🌄 Curated Indian Travel Sanctuaries
- **12 Iconic Indian Destinations**: Kashmir Valley & Gulmarg, Jaipur (Pink City), Kerala Backwaters & Munnar, Ladakh & Pangong Tso, Varanasi (Kashi), Goa (North & South), Udaipur (City of Lakes), Meghalaya (Living Root Bridges & Dawki), Andaman Islands (Radhanagar Beach), Hampi (Vijayanagara), Manali & Spiti Valley, and Rishikesh & Haridwar.
- **Rich Landmark Metadata**: Comprehensive guide for each destination including Indian state/region, local language, best visiting seasons, daily budget in INR (`₹`), entry passes, visit duration, and insider photography tips.

### 🎥 Direct Video Hero Landing (Zero Image Lag)
- **Instant Video Playback**: Direct local looping video playback (`autoPlay loop muted playsInline preload="auto"`) with zero static image lag on initial page load.
- **Seamless Dual-Player Crossfade**: Employs an synchronized dual-player crossfade controller that dissolves imperceptibly before the video loop ends, removing all visual seams or stutter.

### 📐 Spacious & Responsive 3-Column Grid
- **Balanced Desktop Layout**: 3 cards per row on large screens (`lg:grid-cols-3`), 2 cards on tablets (`md:grid-cols-2`), and 1 full-width card on mobile (`grid-cols-1`).
- **Interactive Card Hover Animations**: 3D lift elevation (`hover:-translate-y-2.5`), continuous ambient glowing shadows (`shadow-amber-500/15`), smooth image zoom (`scale-110`), and sweeping shimmer light flare effects.

### 🧭 Explore by Travel Style (Click-to-Filter)
- **6 Indian Experience Themes**: *Himalayan & Alpine Treks, Royal Haveli & Palace Stays, Backwaters & Ayurvedic Wellness, Spiritual & Sacred Ghats, Bengal Tiger & Jungle Safaris, and Tropical Beach & Coral Isles*.
- **Interactive Filtering**: Tapping any travel style automatically filters the destination collection and smoothly scrolls to the results.

### 🌤️ Live Destination Weather Radar
- **Comprehensive Indian & Global Coverage**: Real-time temperature, atmospheric conditions, real-feel temperature, humidity %, wind speed (km/h), and 5-day forecast.
- **Dynamic Search & Quick Chips**: Instant search for any Indian or international city with 1-click quick radar buttons (*Kashmir, Jaipur, Goa, Ladakh, Kerala, Varanasi, Manali*) and quick `°C / °F` temperature unit toggling.
- **Zero-Downtime Fallback**: Dynamic meteorological generator guarantees 100% reliable results even without API credentials.

### 🤖 Google Gemini AI Travel Concierge
- **Conversational Indian Concierge**: Interactive drawer offering authentic advice on cultural etiquette, regional culinary trails (*Wazwan, Dal Baati Churma, Kerala Sadhya, Banarasi Chaat*), hidden viewpoints, and transit.
- **In-Chat Destination Switcher**: Dropdown selector inside the chat drawer allowing users to switch contexts on the fly.
- **Dynamic Context Recognition**: Automatically detects mentioned destinations within user questions.

### 📅 AI Day-by-Day Itinerary Planner
- **Customization Engine**: Configurable trip parameters (1 to 7 Days, Travel Style, Budget Tier in INR).
- **Structured Visual Timeline**: Generates clear Morning (🌅), Afternoon (☀️), and Evening (🌙) milestone cards with durations, activities, and pro tips.
- **Celebration Confetti**: Animated canvas confetti celebration on itinerary generation.

### 🔤 Google Fonts Typography Integration
- **Body & Controls**: *Plus Jakarta Sans* & *Inter* for ultra-clean, modern legibility.
- **Headings & Titles**: *Outfit* & *Playfair Display* for luxurious editorial appeal.

---

## 🛠️ 4. Architecture & Directory Structure

```
Aura_Travel/
├── public/
│   ├── hero-video.mp4           # HD looping hero background video
│   ├── hero-vedio.mp4           # Video alias
│   └── favicon.svg              # App favicon
├── src/
│   ├── assets/                  # SVG Icons & logos
│   ├── components/
│   │   ├── ai/
│   │   │   └── AIChatbotModal.jsx          # Gemini AI chat drawer
│   │   ├── destinations/
│   │   │   ├── DestinationCard.jsx         # 3D animated destination card
│   │   │   ├── DestinationDetailModal.jsx  # Detailed landmark modal
│   │   │   └── DestinationExplorer.jsx     # 3-column responsive catalog & filters
│   │   ├── hero/
│   │   │   └── HeroSection.jsx             # Dual-player seamless video hero
│   │   ├── itinerary/
│   │   │   ├── ItineraryPlannerModal.jsx   # Day-by-day generator wizard
│   │   │   └── ItineraryTimeline.jsx       # Morning / afternoon / evening timeline
│   │   ├── layout/
│   │   │   ├── Navbar.jsx                  # Glassmorphic top navigation
│   │   │   └── Footer.jsx                  # Multi-column footer & back-to-top
│   │   ├── places/
│   │   │   └── FamousPlaceCard.jsx         # Landmark spotlight card
│   │   ├── sections/
│   │   │   ├── AITripPlannerBanner.jsx     # AI feature callout banner
│   │   │   ├── TravelStyleSection.jsx      # Click-to-filter categories
│   │   │   └── WhyChooseUs.jsx             # Trust and feature assurances
│   │   └── weather/
│   │       └── WeatherWidget.jsx           # Real-time weather radar
│   ├── context/
│   │   └── TravelContext.jsx               # Global state management
│   ├── data/
│   │   └── destinationsData.js             # 12 Curated Indian destinations dataset
│   ├── services/
│   │   ├── geminiService.js                # Google Gemini AI integration & fallback
│   │   ├── openWeatherService.js           # Weather API & Indian meteorological database
│   │   ├── geolocationService.js           # HTML5 GPS coordinate detection
│   │   └── imageService.js                 # Dynamic photography resolution
│   ├── index.css                           # Tailwind CSS v4 & Google Fonts
│   ├── App.jsx                             # Main layout with section dividers
│   └── main.jsx                            # React 19 entrypoint
├── index.html                              # Google Fonts preconnect & title
├── package.json                            # Dependencies & scripts
├── vercel.json                             # Vercel deployment & SPA routing config
└── vite.config.js                          # Vite 8 & Tailwind plugins
```

---

## 💻 5. Instructions on How to Run the Project Locally

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** (or `yarn` / `pnpm`)

### Step-by-Step Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/aura-travel.git
   cd aura-travel
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   ```
   > **Note:** The application includes intelligent built-in fallback engines with comprehensive Indian destination schedules and meteorological data, so all features run seamlessly even without API keys.

4. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

6. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🌐 6. Deployment on Vercel

The repository includes a preconfigured [`vercel.json`](./vercel.json) ready for 1-click deployment:

1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Click **Deploy**.

**Live URL:** [https://aura-travel-nine.vercel.app/](https://aura-travel-nine.vercel.app/)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
