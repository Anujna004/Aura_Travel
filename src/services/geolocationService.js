/**
 * Browser Geolocation Service
 * Requests browser permission to get user coordinates, or falls back gracefully.
 */

export const getUserCoordinates = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        granted: false,
        error: "Geolocation is not supported by your browser.",
        coords: null
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          granted: true,
          error: null,
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
        });
      },
      (err) => {
        let message = "Location permission denied or unavailable.";
        if (err.code === err.PERMISSION_DENIED) {
          message = "Location access was denied. Using manual location search.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = "Location information is unavailable.";
        } else if (err.code === err.TIMEOUT) {
          message = "Location request timed out.";
        }

        resolve({
          granted: false,
          error: message,
          coords: null
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 300000 // 5 minutes cache
      }
    );
  });
};
