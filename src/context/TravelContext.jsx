import React, { createContext, useContext, useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { getUserCoordinates } from '../services/geolocationService';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../services/openWeatherService';

const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  // Destinations state
  const [destinations] = useState(DESTINATIONS);
  const [activeDestination, setActiveDestination] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedContinent, setSelectedContinent] = useState('All Regions');
  const [sortBy, setSortBy] = useState('trending'); // trending, rating, temp

  // Location & Weather state
  const [userLocation, setUserLocation] = useState({
    granted: false,
    loading: true,
    cityName: 'Srinagar, Kashmir',
    error: null,
    coords: null
  });
  
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [tempUnit, setTempUnit] = useState('C'); // 'C' or 'F'

  // AI Assistant & Itinerary State (Default to Kashmir, India)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotTargetDestination, setChatbotTargetDestination] = useState('Kashmir');
  const [isItineraryPlannerOpen, setIsItineraryPlannerOpen] = useState(false);
  const [itineraryTargetDestination, setItineraryTargetDestination] = useState('Kashmir');
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  // Initialize Geolocation & Initial Weather
  useEffect(() => {
    let isMounted = true;

    const initLocation = async () => {
      const geoResult = await getUserCoordinates();
      if (!isMounted) return;

      if (geoResult.granted && geoResult.coords) {
        setUserLocation({
          granted: true,
          loading: false,
          cityName: 'Your Detected Location',
          error: null,
          coords: geoResult.coords
        });
        // Fetch weather by GPS coordinates
        setWeatherLoading(true);
        const weather = await fetchWeatherByCoords(geoResult.coords.lat, geoResult.coords.lon);
        if (isMounted) {
          setCurrentWeather(weather);
          setWeatherLoading(false);
        }
      } else {
        // Fallback default Indian location: Kashmir / Srinagar
        setUserLocation({
          granted: false,
          loading: false,
          cityName: 'Srinagar, Kashmir',
          error: geoResult.error,
          coords: { lat: 34.0837, lon: 74.7973 }
        });
        setWeatherLoading(true);
        const weather = await fetchWeatherByCity('Kashmir');
        if (isMounted) {
          setCurrentWeather(weather);
          setWeatherLoading(false);
        }
      }
    };

    initLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update weather when user manually searches for a city in weather bar
  const handleManualWeatherSearch = async (cityName) => {
    setWeatherLoading(true);
    const weather = await fetchWeatherByCity(cityName);
    setCurrentWeather(weather);
    setUserLocation(prev => ({
      ...prev,
      cityName: weather.cityName || cityName
    }));
    setWeatherLoading(false);
  };

  // Open Destination Details Modal
  const openDestinationDetail = (destination) => {
    setActiveDestination(destination);
    setIsDetailModalOpen(true);
  };

  // Close Destination Details Modal
  const closeDestinationDetail = () => {
    setIsDetailModalOpen(false);
  };

  // Open AI Chatbot Drawer
  const openChatbot = (destName = 'Kashmir') => {
    setChatbotTargetDestination(destName);
    setIsChatbotOpen(true);
  };

  // Open Itinerary Planner Modal
  const openItineraryPlanner = (destName = 'Kashmir') => {
    setItineraryTargetDestination(destName);
    setIsItineraryPlannerOpen(true);
  };

  // Toggle Temperature Unit (°C / °F)
  const toggleTempUnit = () => {
    setTempUnit(prev => (prev === 'C' ? 'F' : 'C'));
  };

  const convertTemp = (celsius) => {
    if (celsius === null || celsius === undefined) return '--';
    if (tempUnit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  return (
    <TravelContext.Provider
      value={{
        destinations,
        activeDestination,
        selectedDestination: activeDestination,
        setSelectedDestination: setActiveDestination,
        isDetailModalOpen,
        openDestinationDetail,
        closeDestinationDetail,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedContinent,
        setSelectedContinent,
        sortBy,
        setSortBy,
        userLocation,
        currentWeather,
        weatherLoading,
        handleManualWeatherSearch,
        tempUnit,
        toggleTempUnit,
        convertTemp,
        isChatbotOpen,
        chatbotOpen: isChatbotOpen,
        setIsChatbotOpen,
        setChatbotOpen: setIsChatbotOpen,
        openChatbot,
        chatbotTargetDestination,
        setChatbotTargetDestination,
        isItineraryPlannerOpen,
        itineraryModalOpen: isItineraryPlannerOpen,
        setIsItineraryPlannerOpen,
        setItineraryModalOpen: setIsItineraryPlannerOpen,
        openItineraryPlanner,
        itineraryTargetDestination,
        setItineraryTargetDestination,
        generatedItinerary,
        setGeneratedItinerary
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => useContext(TravelContext);
export const useTravelContext = () => useContext(TravelContext);
