// Pricing data model based on the provided table
const pricingData = [
  {
    country: "GB",
    city: "London",
    vehicleType: "Economy",
    airportFees: 5,
    amountPerHour: 60,
    amountPerKM: 2,
    baseAmount: 35,
    baseKM: 15,
  },
  {
    country: "GB",
    city: "London",
    vehicleType: "Comfort",
    airportFees: 8,
    amountPerHour: 65,
    amountPerKM: 3,
    baseAmount: 45,
    baseKM: 15,
  },
  {
    country: "GB",
    city: "London",
    vehicleType: "Minivan",
    airportFees: 10,
    amountPerHour: 70,
    amountPerKM: 5,
    baseAmount: 55,
    baseKM: 15,
  },
  // More pricing data can be added here for other cities
];

/**
 * Get pricing data for a specific city and vehicle type
 * @param {string} city - City name
 * @param {string} vehicleType - Type of vehicle
 * @returns {Object|null} - Pricing data object or null if not found
 */
exports.getPricing = (city, vehicleType) => {
  return (
    pricingData.find(
      (pricing) =>
        pricing.city.toLowerCase() === city.toLowerCase() &&
        pricing.vehicleType.toLowerCase() === vehicleType.toLowerCase()
    ) || null
  );
};

/**
 * Calculate ride price
 * @param {Object} pricing - Pricing data for the city and vehicle type
 * @param {number} distance - Distance in kilometers
 * @param {boolean} isAirport - Whether the ride includes airport
 * @returns {number} - Calculated price in EUR
 */
exports.calculatePrice = (pricing, distance, isAirport = false) => {
  if (!pricing) return 0;

  // Base price includes the base distance
  let price = pricing.baseAmount;

  // Add price for additional distance beyond base distance
  if (distance > pricing.baseKM) {
    price += (distance - pricing.baseKM) * pricing.amountPerKM;
  }

  // Add airport fees if applicable
  if (isAirport) {
    price += pricing.airportFees;
  }

  return price;
};
