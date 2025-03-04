/**
 * Validates if a distance is within acceptable range
 * @param {number} distance - Distance in kilometers
 * @param {number} maxDistance - Maximum allowed distance
 * @returns {boolean} - True if distance is valid
 */
exports.isValidDistance = (distance, maxDistance) => {
  return (
    typeof distance === "number" && distance >= 0 && distance <= maxDistance
  );
};

/**
 * Validates if a city is supported
 * @param {string} city - City name
 * @param {Object} supportedCities - Object containing supported cities
 * @returns {boolean} - True if city is supported
 */
exports.isSupportedCity = (city, supportedCities) => {
  return Object.keys(supportedCities)
    .map((c) => c.toLowerCase())
    .includes(city.toLowerCase());
};

/**
 * Validates vehicle type
 * @param {string} vehicleType - Vehicle type
 * @returns {boolean} - True if vehicle type is valid
 */
exports.isValidVehicleType = (vehicleType) => {
  const validTypes = ["Economy", "Comfort", "Minivan"];
  return validTypes.includes(vehicleType);
};
