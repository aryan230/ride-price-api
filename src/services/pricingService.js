const config = require("../config/config");
const pricingModel = require("../models/pricingModel");
const cityModel = require("../models/cityModel");

/**
 * Determine if email is required for ride price check
 * @param {string} pickup - Pickup address
 * @param {string} destination - Destination address
 * @param {Object} distanceData - Distance data object from distanceService
 * @param {string} vehicleType - Type of vehicle (default to Economy)
 * @param {boolean} isAirport - Whether the ride includes airport
 * @returns {Object} - Result object with isEmailRequired flag and other info
 */
exports.checkEmailRequirement = async (
  pickup,
  destination,
  distanceData,
  vehicleType = "Economy",
  isAirport = false
) => {
  const { distance, city } = distanceData;

  // Check if distance is too far
  if (distance > config.maxRideDistance) {
    throw new Error("Too far to offer ride");
  }

  // Get pricing data for the city and vehicle type
  const pricing = pricingModel.getPricing(city, vehicleType);

  // Calculate price
  const price = pricingModel.calculatePrice(pricing, distance, isAirport);

  // Apply logic to determine if email is required
  // 1. If distance is more than 30 km
  // 2. City flag is on (if city is not flagged we always ask for email)
  // 3. Price is less than €50

  const isEmailRequiredByDistance = distance > config.maxDistanceWithoutEmail;
  const isEmailRequiredByCity = cityModel.isEmailRequired(city);
  const isEmailRequiredByPrice = price < config.minPriceForEmail;

  // Email is required if any of the conditions are met
  const isEmailRequired =
    isEmailRequiredByDistance ||
    isEmailRequiredByCity ||
    isEmailRequiredByPrice;

  return {
    isEmailRequired,
    distance,
    city,
    price,
    vehicleType,
  };
};
