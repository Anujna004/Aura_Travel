/**
 * Google Gemini AI Integration Service
 * 1. Generates structured JSON day-by-day itineraries tailored for Indian & Global destinations
 * 2. Powers the conversational AI Travel Concierge chatbot
 * Includes sophisticated intelligent fallback logic for seamless offline/demo usage.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Sends prompt to Gemini API for Conversational Assistant
 */
export const askGeminiChatbot = async (userPrompt, destinationName = "Kashmir Valley", chatHistory = []) => {
  const cleanPrompt = userPrompt.trim();
  
  // Extract or resolve destination name from prompt if mentioned
  const indianDestinations = [
    "Kashmir", "Jaipur", "Kerala", "Ladakh", "Varanasi", "Goa", 
    "Udaipur", "Meghalaya", "Andaman", "Hampi", "Manali", "Rishikesh",
    "Srinagar", "Gulmarg", "Pahalgam", "Leh", "Munnar", "Alleppey", "Shillong"
  ];
  
  let effectiveDest = destinationName || "Kashmir Valley";
  for (const place of indianDestinations) {
    if (cleanPrompt.toLowerCase().includes(place.toLowerCase())) {
      effectiveDest = place;
      break;
    }
  }

  if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== "" && GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY") {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      
      const systemInstruction = `You are AURA, an elite AI luxury travel concierge specializing exclusively in Indian travel destinations (Kashmir, Rajasthan, Kerala, Ladakh, Varanasi, Goa, Meghalaya, Hampi, Manali, Rishikesh, Andaman, Udaipur, etc.).
You are helpful, sophisticated, knowledgeable, and concise.
Provide specific advice on best seasons, authentic local cuisines (e.g. Kashmiri Wazwan, Rajasthani Dal Baati Churma, Kerala Sadhya, Goan Fish Curry, Banarasi Chaat), hidden viewpoints, transit tips, and local cultural etiquette. Format your response using clean Markdown with bullet points and bold highlights. Keep responses under 200 words. Never default to foreign cities unless explicitly asked.`;

      const contents = [
        { role: "user", parts: [{ text: systemInstruction }] },
        ...chatHistory.map(msg => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        })),
        { role: "user", parts: [{ text: `Target Indian Destination: ${effectiveDest}. User Question: ${cleanPrompt}` }] }
      ];

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return candidate;
        }
      }
    } catch (error) {
      console.warn("Gemini API query failed, using tailored Indian concierge fallback:", error);
    }
  }

  return generateIndianFallbackChatResponse(cleanPrompt, effectiveDest);
};

/**
 * Generates Structured JSON Day-by-Day Itinerary from Gemini API
 */
export const generateAIItinerary = async ({ destination = "Kashmir Valley", days = 3, style = "Balanced", budget = "Moderate" }) => {
  if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== "" && GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY") {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      const promptText = `Generate a detailed structured travel itinerary for ${destination}, India for ${days} days.
Traveler Style: ${style}. Budget level: ${budget}.

You MUST return strictly valid JSON matching this structure without markdown code blocks, explanation or wrapping text:

{
  "tripTitle": "${days}-Day ${style} Experience in ${destination}",
  "destination": "${destination}",
  "daysCount": ${days},
  "estimatedBudget": "₹ budget range in INR",
  "highlightsSummary": ["Highlight 1", "Highlight 2", "Highlight 3"],
  "days": [
    {
      "dayNumber": 1,
      "theme": "Theme of Day 1",
      "slots": {
        "morning": {
          "title": "Attraction / Place Name",
          "activity": "Detailed activity description",
          "duration": "2.5 Hours",
          "tip": "Insider tip for morning visit"
        },
        "afternoon": {
          "title": "Afternoon Place / Dining",
          "activity": "Activity and lunch spotlight",
          "duration": "3 Hours",
          "tip": "Useful tip for afternoon"
        },
        "evening": {
          "title": "Evening Viewpoint / Dinner",
          "activity": "Evening dinner and twilight atmosphere",
          "duration": "2 Hours",
          "tip": "Nighttime photography tip"
        }
      }
    }
  ]
}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            response_mime_type: "application/json"
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const cleanJSON = rawText.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(cleanJSON);
          return parsed;
        }
      }
    } catch (error) {
      console.warn("Gemini Itinerary API query failed, generating tailored Indian itinerary:", error);
    }
  }

  return generateIndianFallbackItineraryJSON(destination, days, style, budget);
};

// Destination-specific Indian AI knowledge base
const DESTINATION_TIPS = {
  Kashmir: {
    spots: "Dal Lake Shikara ride at sunrise, Gulmarg Gondola Apharwat Peak, Betaab & Aru Valleys in Pahalgam.",
    food: "Traditional 36-course Wazwan (Rogan Josh, Gushtaba, Rista), saffron Kahwa tea with almonds, and Kashmiri naan.",
    duration: "4 to 6 days is ideal to cover Srinagar, Gulmarg, and Pahalgam.",
    season: "March–May (Spring blooms), Oct–Nov (Chinar autumn foliage), Dec–Feb (Snow & skiing)."
  },
  Jaipur: {
    spots: "Amber Fort Sheesh Mahal, Hawa Mahal Palace of Winds, City Palace royal quarters, and Nahargarh sunset fort ramparts.",
    food: "Authentic Dal Baati Churma, Pyaaz Kachori from Rawat Mishthan Bhandar, Ghewar, and Laal Maas.",
    duration: "3 to 4 days covers the royal forts, palaces, and heritage textile bazaars.",
    season: "October to March for cool desert temperatures and vibrant cultural festivals."
  },
  Kerala: {
    spots: "Alleppey backwaters luxury houseboat cruise, Munnar tea plantation hills, and Periyar bamboo rafting.",
    food: "Banana leaf Kerala Sadhya, Karimeen Pollichathu (pearl spot fish in banana leaf), Appam with stew, and fresh coconut water.",
    duration: "5 to 7 days to cover Kochi, Munnar hills, and Alleppey backwaters.",
    season: "September to March for pleasant lagoon weather; June to August for monsoon Ayurveda retreats."
  },
  Ladakh: {
    spots: "Pangong Tso azure lake, Nubra Valley Hunder sand dunes, Khardung La pass (5,359m), and Thiksey Monastery.",
    food: "Warm Thukpa noodle soup, steamed Momos with chili chutney, Butter tea (Gur Gur chai), and Apricot jam.",
    duration: "6 to 8 days with at least 2 days of initial rest in Leh for altitude acclimatization.",
    season: "May to September when high mountain passes are open and skies are crystal blue."
  },
  Varanasi: {
    spots: "Dashashwamedh Ghat evening Ganga Maha Aarti, dawn boat cruise past 84 ghats, Kashi Vishwanath corridor, and Sarnath.",
    food: "Banarasi Tamatar Chaat, creamy Malaiyo milk foam (winter specialty), crispy Kachori-Jalebi, and Banarasi Paan.",
    duration: "2 to 3 days to immerse in the spiritual ceremonies, ghat walks, and silk weaving gallis.",
    season: "October to March for pleasant temperatures during morning and evening river walks."
  },
  Goa: {
    spots: "Fontainhas Latin quarter heritage villas in Panaji, Palolem & Butterfly beaches, Dudhsagar falls, and Fort Aguada.",
    food: "Goan Fish Curry Thali, Pork Vindaloo, freshly baked Poee bread, Bebinca layered dessert, and Sol Kadi.",
    duration: "4 to 5 days to explore both the heritage north and tranquil south coast.",
    season: "November to March for warm sunny beach days and lively seaside dining."
  },
  Udaipur: {
    spots: "Sunset boat cruise on Lake Pichola, City Palace Mewar Museum, Jagmandir Island, and Bagore Ki Haveli dance show.",
    food: "Gatte ki Sabzi, Rajasthani Ker Sangri, Mewari Thali, and lakeside candlelight rooftop dining.",
    duration: "3 to 4 days for palaces, art galleries, and scenic sunset viewpoints.",
    season: "September to March for romantic pleasant evenings over the lake."
  },
  Meghalaya: {
    spots: "Nongriat Double Decker Living Root Bridges, Dawki crystal Umngot river, Nohkalikai Falls, and Mawlynnong clean village.",
    food: "Khasi Jadoh (rice cooked with aromatic spices and herbs), Dohneiiong (pork with black sesame), and bamboo shoot curry.",
    duration: "4 to 6 days to trek root bridges, explore caves, and boat on transparent rivers.",
    season: "September to May for crystal water clarity and pleasant trekking temperatures."
  },
  Hampi: {
    spots: "Vittala Temple carved Stone Chariot, Virupaksha Temple, Matanga Hill sunrise trek, and coracle boat river rides.",
    food: "Traditional Karnataka South Indian Thali, crispy Bisi Bele Bath, fresh coconut dosas, and mango lassi.",
    duration: "2 to 3 days to explore both the sacred center and royal boulder enclosures.",
    season: "October to March for comfortable temperatures while exploring open-air granite ruins."
  },
  Manali: {
    spots: "Solang Valley adventure sports, Atal Tunnel into Sissu (Lahaul), Hadimba cedar temple, and Old Manali riverside cafés.",
    food: "Siddu (steamed stuffed wheat bread with ghee), Trout fish fry, Kullu Dham feast, and hot spiced mountain chai.",
    duration: "3 to 5 days for mountain viewpoints, paragliding, and day trips to Rohtang Pass.",
    season: "October to June (Snow and skiing from December to February)."
  },
  Rishikesh: {
    spots: "White-water Ganges river rafting, Triveni Ghat evening Maha Aarti, The Beatles Ashram, and Laxman Jhula footbridge.",
    food: "Ayurvedic Satvik thalis, wood-fired organic café pizzas in Tapovan, fresh mango smoothie bowls, and ginger lemon honey tea.",
    duration: "2 to 4 days for yoga sessions, rafting rapids, and riverfront meditation.",
    season: "September to April for optimal rafting currents and clear mountain skies."
  },
  Andaman: {
    spots: "Radhanagar Beach (Asia's top beach), Elephant Beach snorkeling, Havelock scuba diving, and Cellular Jail memorial.",
    food: "Fresh grilled seafood platters, coconut fish curry, tropical fruit smoothies, and coastal South Indian delicacies.",
    duration: "5 to 7 days to visit Port Blair, Havelock, and Neil Island.",
    season: "October to May for calm turquoise seas and prime underwater visibility."
  }
};

// Comprehensive Indian AI Concierge Fallback
const generateIndianFallbackChatResponse = (prompt, destination) => {
  const p = prompt.toLowerCase();
  
  // Find matched destination in tips database
  let matchedKey = Object.keys(DESTINATION_TIPS).find(k => 
    destination.toLowerCase().includes(k.toLowerCase()) || p.includes(k.toLowerCase())
  );
  
  const destName = matchedKey || "India";
  const tips = matchedKey ? DESTINATION_TIPS[matchedKey] : null;

  if (p.includes("how long") || p.includes("days") || p.includes("duration")) {
    const durationAdvice = tips ? tips.duration : "4 to 6 days is ideal to comfortably explore major sights, heritage landmarks, and local bazaars.";
    return `**Ideal Duration for ${destName}**:\n\n* **Recommendation**: ${durationAdvice}\n* **Quick Getaway**: 2–3 days covers the essential highlights.\n* **Deep Immersion**: 7 days allows leisure time for side excursions, scenic nature trails, and authentic dining!`;
  }

  if (p.includes("eat") || p.includes("food") || p.includes("restaurant") || p.includes("dish") || p.includes("cuisine")) {
    const foodAdvice = tips ? tips.food : "Authentic regional thalis, freshly prepared local street chaats, and traditional spiced chai.";
    return `**Culinary Highlights in ${destName}**:\n\n* **Must-Try Specialties**: ${foodAdvice}\n* **Dining Tip**: Seek out heritage thali eateries and popular local markets in the evening for the freshest flavors.\n* **Drink**: Don't miss fresh coconut water and local spiced masala chai!`;
  }

  if (p.includes("when to go") || p.includes("weather") || p.includes("season") || p.includes("month")) {
    const seasonAdvice = tips ? tips.season : "October to March offers pleasant temperatures and clear skies across most of India.";
    return `**Best Season to Visit ${destName}**:\n\n* **Optimal Period**: ${seasonAdvice}\n* **Packing Essentials**: Comfortable breathable cotton clothes, sturdy walking shoes, and a light jacket/shawl for cool evenings.`;
  }

  if (p.includes("places") || p.includes("spots") || p.includes("visit") || p.includes("sights") || p.includes("attractions")) {
    const spotsAdvice = tips ? tips.spots : "Iconic heritage forts, scenic viewpoints, sacred temples, and bustling cultural bazaars.";
    return `**Top Attractions in ${destName}**:\n\n* **Highlights**: ${spotsAdvice}\n* **Pro Tip**: Start your sightseeing early (8:30 AM) to beat crowds and get the best natural light for photography!\n* **Itinerary**: Use our **AI Trip Planner** to generate a day-by-day schedule with morning, afternoon, and evening slots.`;
  }

  return `**AURA AI Concierge Insights for ${destName}**:\n\n${destName} is one of India's most extraordinary destinations!\n\n* **Must-Visit**: ${tips ? tips.spots.split(',')[0] : 'Historical heritage centers and scenic viewpoints'}.\n* **Culinary**: ${tips ? tips.food.split(',')[0] : 'Authentic local cuisine and regional specialties'}.\n* **Best Time**: ${tips ? tips.season.split('(')[0] : 'October to March'}.\n\n*Tap any starter question below or ask me about specific landmarks, hotels, or packing advice for ${destName}!*`;
};

// Rich Indian Itinerary Fallback Generator
const generateIndianFallbackItineraryJSON = (destination, days = 3, style = "Balanced", budget = "Moderate") => {
  const destinationSchedules = {
    Kashmir: [
      { morning: "Dal Lake Sunrise Shikara & Floating Garden Market", afternoon: "Mughal Terraced Gardens (Shalimar & Nishat Bagh)", evening: "Lal Chowk Saffron Bazaar & Traditional Wazwan Dinner" },
      { morning: "Scenic Drive to Gulmarg & Apharwat Peak Gondola", afternoon: "Alpine Meadow Walk & Strawberry Valley", evening: "Heritage Houseboat Cedarwood Lounge Stroll" },
      { morning: "Excursion to Pahalgam & Betaab Valley", afternoon: "Lidder River Rapids & Aru Valley Pine Trails", evening: "Riverside Bonfire & Kashmiri Kahwa Gathering" },
      { morning: "Old Srinagar Heritage Walk & Jamia Masjid", afternoon: "Pashmina & Walnut Wood Artisan Workshop", evening: "Sunset at Shankaracharya Temple Viewpoint" }
    ],
    Jaipur: [
      { morning: "Amber Fort & Royal Sheesh Mahal Courtyard", afternoon: "Anokhi Hand-Block Printing Museum & Traditional Rajasthani Thali", evening: "Nahargarh Fort Panoramic Sunset & City Lights" },
      { morning: "Hawa Mahal Sunrise & City Palace Royal Quarters", afternoon: "Jantar Mantar UNESCO Astronomical Observatory", evening: "Johari Bazaar Gem & Textile Walk" },
      { morning: "Jaigarh Fort & World's Largest Cannon", afternoon: "Albert Hall Museum & Ram Niwas Gardens", evening: "Chokhi Dhani Cultural Heritage Feast" }
    ],
    Kerala: [
      { morning: "Alleppey Backwaters Houseboat Boarding & Coconut Lagoon", afternoon: "Traditional Kettuvallam Cruise & Fresh Karimeen Feast", evening: "Vembanad Lake Sunset Reflections & Village Walk" },
      { morning: "Munnar Rolling Tea Plantation Safari", afternoon: "Tata Tea Museum & Blossom Hydel Park", evening: "Kathakali Martial Art & Classical Dance Performance" },
      { morning: "Periyar Wildlife Sanctuary Bamboo Rafting", afternoon: "Cardamom & Pepper Spice Plantation Guided Walk", evening: "Ayurvedic Herbal Rejuvenation Massage" }
    ],
    Ladakh: [
      { morning: "Leh Palace & Shanti Stupa Morning Panoramas", afternoon: "Hall of Fame & Magnetic Hill Phenomenon", evening: "Leh Old Market Tibetan Artefacts & Apricot Jam Tasting" },
      { morning: "Cross Khardung La Pass (5,359m) into Nubra Valley", afternoon: "Hunder White Sand Dunes & Double-Humped Camel Safari", evening: "Diskit Monastery Giant Buddha Statue at Sunset" },
      { morning: "Journey to Pangong Tso Lake (4,350m)", afternoon: "Color-Shifting Azure Waters & Shoreline Photography", evening: "Stargazing under Crystal Unpolluted Himalayan Skies" }
    ],
    Varanasi: [
      { morning: "Dawn Rowing Boat along 84 Sacred Ghats", afternoon: "Kashi Vishwanath Corridor & Silk Weaving Gallis", evening: "Dashashwamedh Ghat Grand Ganga Maha Aarti" },
      { morning: "Sarnath Deer Park & Dhamek Stupa Archaeological Site", afternoon: "Banaras Hindu University & Bharat Kala Bhavan", evening: "Assi Ghat Evening Classical Music & Kulhad Chai" },
      { morning: "Heritage Temple Trail & Manikarnika Ghat Perspective", afternoon: "Famous Banarasi Malaiyo & Kachori Food Safari", evening: "Twilight Ganges Cruise & Floating Diyas" }
    ],
    Goa: [
      { morning: "Fontainhas Latin Quarter Heritage Walk (Panaji)", afternoon: "Old Goa Basilica of Bom Jesus & Se Cathedral", evening: "Mandovi River Sunset Yacht Cruise" },
      { morning: "Dudhsagar Jungle Waterfalls 4x4 Jeep Safari", afternoon: "Tropical Spice Plantation Tour & Goan Buffet", evening: "Palolem Beach Candlelit Seafood Dinner" },
      { morning: "Vagator & Chapora Fort Cliff Vistas", afternoon: "Anjuna Flea Market & Seaside Cafés", evening: "North Goa Beachside Sunset Lounge" }
    ]
  };

  // Find schedule by fuzzy key
  let matchedKey = Object.keys(destinationSchedules).find(k => 
    destination.toLowerCase().includes(k.toLowerCase())
  );

  const cityPlan = matchedKey ? destinationSchedules[matchedKey] : [
    { morning: `Iconic Historical Monument & Heritage Center of ${destination}`, afternoon: `Local Cultural Gallery & Authentic Regional Cuisine`, evening: `Panoramic Sunset Viewpoint & Evening Bazaar` },
    { morning: `Scenic Nature Sanctuary & Morning Walk`, afternoon: `Handicraft Artisan Village & Food Tasting`, evening: `Waterfront Promenade & Cultural Performance` },
    { morning: `Hilltop Vista & Sacred Heritage Trail`, afternoon: `Architectural Wonder & Photography Tour`, evening: `Farewell Twilight Dining & Stargazing` }
  ];

  const numDays = Math.min(days, 7);
  const generatedDays = [];

  for (let i = 1; i <= numDays; i++) {
    const plan = cityPlan[(i - 1) % cityPlan.length];
    generatedDays.push({
      dayNumber: i,
      theme: `Day ${i}: ${i === 1 ? 'First Impressions & Iconic Landmarks' : i === 2 ? 'Cultural Heritage & Hidden Flavors' : 'Panoramic Vistas & Artisan Discoveries'}`,
      slots: {
        morning: {
          title: plan.morning,
          activity: `Experience ${plan.morning} during the golden morning hours with minimal crowds and ideal light for photography.`,
          duration: "2.5 Hours",
          tip: "Start at 8:30 AM with comfortable footwear."
        },
        afternoon: {
          title: plan.afternoon,
          activity: `Immerse in ${plan.afternoon}, followed by authentic regional delicacies at a renowned dining establishment.`,
          duration: "3 Hours",
          tip: "Try the signature local specialty dish recommended by the head chef."
        },
        evening: {
          title: plan.evening,
          activity: `Conclude the day at ${plan.evening} with relaxing twilight ambiance and stunning evening vistas.`,
          duration: "2 Hours",
          tip: "Arrive 30 minutes before dusk for the sunset transition."
        }
      }
    });
  }

  const budgetRanges = {
    Budget: "₹2,500 - ₹4,500 / day",
    Moderate: "₹4,500 - ₹8,500 / day",
    Luxury: "₹9,000 - ₹20,000 / day"
  };

  return {
    tripTitle: `${numDays}-Day ${style} Experience in ${destination}`,
    destination: destination,
    daysCount: numDays,
    estimatedBudget: budgetRanges[budget] || "₹4,500 - ₹8,500 / day",
    highlightsSummary: [
      `Curated day-by-day plan optimized for ${style.toLowerCase()} travel rhythm`,
      `Includes morning, afternoon, and evening structured timelines with insider advice`,
      `Verified local culinary hotspots and transit optimization`
    ],
    days: generatedDays
  };
};
