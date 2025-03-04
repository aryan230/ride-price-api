const axios = require("axios");
const config = require("../config/config");
const geocodingMock = require("../utils/geocodingMock");

/**
 * Get distance between two addresses using Google Distance Matrix API
 * @param {string} pickup - Pickup address
 * @param {string} destination - Destination address
 * @returns {Promise<Object>} - Object containing distance in km and city names
 */
exports.getDistance = async (pickup, destination) => {
  try {
    // For actual implementation with Google API
    if (config.googleMapsApiKey !== "mock-api-key") {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/distancematrix/json",
        {
          params: {
            origins: pickup,
            destinations: destination,
            key: config.googleMapsApiKey,
          },
        }
      );

      if (response.data.status !== "OK") {
        throw new Error(`Google API error: ${response.data.status}`);
      }

      const distance = response.data.rows[0].elements[0].distance.value / 1000; // Convert to km

      // Get city information using Geocoding API
      const pickupGeocode = await getGeocode(pickup);

      return {
        distance,
        city: extractCity(pickupGeocode),
      };
    } else {
      // Mock API response
      return geocodingMock.getMockDistance(pickup, destination);
    }
  } catch (error) {
    console.error("Error getting distance:", error);
    throw error;
  }
};

/**
 * Get geocode information for an address
 * @param {string} address - Address to geocode
 * @returns {Promise<Object>} - Geocode result
 */
async function getGeocode(address) {
  if (config.googleMapsApiKey !== "mock-api-key") {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key: config.googleMapsApiKey,
        },
      }
    );

    if (response.data.status !== "OK") {
      throw new Error(`Geocoding API error: ${response.data.status}`);
    }

    return response.data.results[0];
  } else {
    return geocodingMock.getMockGeocode(address);
  }
}

/**
 * Extract city name from geocode result
 * @param {Object} geocodeResult - Geocode result object
 * @returns {string} - City name
 */
function extractCity(geocodeResult) {
  if (!geocodeResult || !geocodeResult.address_components) {
    return "";
  }

  // Find city component
  const cityComponent = geocodeResult.address_components.find((component) =>
    component.types.includes("locality")
  );

  return cityComponent ? cityComponent.long_name : "";
}
