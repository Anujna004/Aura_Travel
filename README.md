# AURA TRAVEL // Luxury Global Explorer & AI Travel Concierge

> **Front-End Developer Assignment Submission for Designesthetics**  
> Built with React.js, JavaScript (ES6+), HTML5, Tailwind CSS, and Vite. Integrated with Google Gemini AI API, OpenWeather API, Unsplash/Pexels Images API, and Browser Geolocation.

---

## 🌟 Overview & Features Built

AURA Travel is a modern, high-fashion editorial travel web application engineered for global travelers. It combines cinematic visuals, real-time weather radar, location awareness, external photography, and an AI-driven trip planner powered by Google Gemini AI.

### Core Features Implemented (Per PDF Specs):
1. **Cinematic Hero Landing Experience**:
   - Ambient looping travel video background with dark gradient scrims and high-contrast typography.
   - Interactive quick search pill with spotlight counters.
2. **Destination Explorer, Search & Filtering**:
   - Browse 12 curated world-class destinations (Paris, Tokyo, Bali, Dubai, London, New York, Rome, Swiss Alps, Maldives, Singapore, Santorini, Kyoto).
   - Real-time instant search across city names, countries, and landmark highlights.
   - Travel style category pills (*Romantic, Cultural, Urban Luxury, Beach & Island, Mountain Escapes*).
   - Continental region filter (*Europe, Asia, Americas, Middle East*).
   - Sorting by trending status or star ratings.
3. **Destination Details & Famous Places Showcase**:
   - Full-bleed hero modals with travel vitals (Best season, daily budget range, official language, currency, visa requirements).
   - Dedicated landmark cards featuring high-res photos, descriptions, visit duration, ticket/admission guidance, and pro tips.
4. **Location Awareness & Manual Location Search**:
   - Prompts for HTML5 browser location permissions upon arrival.
   - Displays user's city & live weather radar if granted.
   - Graceful fallback with manual city search if location permission is denied.
5. **Real-Time Weather Integration (OpenWeather API)**:
   - Live temperature, real-feel temperature, humidity %, wind speed km/h, and 5-day forecast trends.
   - Dynamic unit switcher (°C / °F).
6. **External Dynamic Imagery (Unsplash & Pexels API)**:
   - Fetches high-resolution dynamic photography with built-in 4K CDN fallback galleries.
7. **Google Gemini AI Travel Concierge Chatbot**:
   - Conversational assistant modal with markdown rendering and suggested starter chips (*"Best 48 hours in Tokyo"*, *"Budget tips"*).
8. **Structured AI Day-by-Day Itinerary Planner**:
   - Custom trip builder (Duration, Style, Budget).
   - **Renders structured JSON into a day-by-day visual timeline with Morning (🌅), Afternoon (☀️), and Evening (🌙) milestone cards** (Not plain text blocks).
   - Built-in PDF export / print capabilities and confetti celebration.

---

## 🛠️ Architecture & Tech Stack

```
src/
├── assets/                  # Icons and media assets
├── components/
│   ├── ai/                  # AIChatbotModal.jsx
│   ├── destinations/        # DestinationExplorer.jsx, DestinationCard.jsx, DestinationDetailModal.jsx
│   ├── hero/                # HeroSection.jsx
│   ├── itinerary/           # ItineraryPlannerModal.jsx, ItineraryTimeline.jsx
│   ├── layout/              # Navbar.jsx, Footer.jsx
│   ├── places/              # FamousPlaceCard.jsx
│   └── weather/             # WeatherWidget.jsx
├── context/                 # TravelContext.jsx (Global State)
├── data/                    # destinationsData.js (12 Curated Hotspots + Landmarks)
├── services/                # geminiService.js, openWeatherService.js, imageService.js, geolocationService.js
├── styles/                  # index.css (Tailwind & Glassmorphism design tokens)
├── App.jsx
└── main.jsx
```

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **yarn**

### Step-by-Step Instructions

1. **Clone or Navigate to the Project Directory**:
   ```bash
   cd travel-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root folder based on `.env.example`:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
   VITE_PEXELS_API_KEY=your_pexels_api_key_here
   ```
   *Note: If API keys are omitted or invalid, the app automatically switches to rich pre-cached fallback engines for zero downtime!*

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment

This application is ready for zero-configuration static deployment on **Vercel**, **Netlify**, or **GitHub Pages**.

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
