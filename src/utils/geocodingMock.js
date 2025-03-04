/**
 * Mock function for distance calculation between two addresses
 * @param {string} pickup - Pickup address
 * @param {string} destination - Destination address
 * @returns {Object} - Object with distance and city information
 */
exports.getMockDistance = (pickup, destination) => {
  // Extract city name from pickup address
  const cities = ["berlin", "london", "paris", "barcelona", "amsterdam"];
  const city =
    cities.find((c) => pickup.toLowerCase().includes(c)) || "unknown";

  // Generate a mock distance based on addresses
  // Simple algorithm to create somewhat realistic distances
  let distance = 0;

  // If both addresses contain the same city name, distance is shorter
  if (
    pickup.toLowerCase().includes(city) &&
    destination.toLowerCase().includes(city)
  ) {
    distance = Math.floor(Math.random() * 20) + 5; // 5-25 km within same city
  } else {
    // Cross-city rides are longer
    distance = Math.floor(Math.random() * 200) + 30; // 30-230 km between cities
  }

  return {
    distance,
    city: city.charAt(0).toUpperCase() + city.slice(1), // Capitalize city name
  };
};

/**
 * Mock function for geocoding
 * @param {string} address - Address to geocode
 * @returns {Object} - Mock geocode result
 */
exports.getMockGeocode = (address) => {
  // Extract city name from address
  const cities = ["berlin", "london", "paris", "barcelona", "amsterdam"];
  const city =
    cities.find((c) => address.toLowerCase().includes(c)) || "unknown";

  return {
    address_components: [
      {
        long_name: city.charAt(0).toUpperCase() + city.slice(1),
        types: ["locality"],
      },
    ],
  };
};
