/**
 * External Image API Service (Pexels / Unsplash with High-Res Fallbacks)
 * Provides dynamic image fetching for destinations and famous landmarks.
 */

const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Reliable fallback imagery bank for instant zero-latency rendering
const FALLBACK_GALLERY = {
  Paris: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=80"
  ],
  Tokyo: [
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80"
  ],
  Bali: [
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=80"
  ],
  Dubai: [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1634733988138-bf2c3a271376?auto=format&fit=crop&w=1200&q=80"
  ]
};

export const fetchImagesForQuery = async (query, count = 4) => {
  // If Pexels API key present, fetch live
  if (PEXELS_KEY && PEXELS_KEY !== "YOUR_PEXELS_API_KEY") {
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}`, {
        headers: { Authorization: PEXELS_KEY }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          return data.photos.map(p => p.src.large2x || p.src.large);
        }
      }
    } catch (e) {
      console.warn("Pexels fetch failed, falling back to Unsplash or local gallery", e);
    }
  }

  // If Unsplash API key present, try Unsplash
  if (UNSPLASH_KEY && UNSPLASH_KEY !== "YOUR_UNSPLASH_ACCESS_KEY") {
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${UNSPLASH_KEY}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          return data.results.map(r => r.urls.regular);
        }
      }
    } catch (e) {
      console.warn("Unsplash fetch failed", e);
    }
  }

  // Fallback to static gallery
  const key = Object.keys(FALLBACK_GALLERY).find(k => query.toLowerCase().includes(k.toLowerCase()));
  if (key) {
    return FALLBACK_GALLERY[key];
  }

  // Default high-res travel photography fallbacks
  return [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1476514525535-ce74f452623d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  ];
};
