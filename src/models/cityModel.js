const config = require("../config/config");

/**
 * Check if email is required for a specific city
 * @param {string} city - City name
 * @returns {boolean} - True if email is required, false otherwise
 */
exports.isEmailRequired = (city) => {
  const cityData = config.cities[city.toLowerCase()];
  // If city is not in our list or email is explicitly required
  return !cityData || cityData.requireEmail;
};
