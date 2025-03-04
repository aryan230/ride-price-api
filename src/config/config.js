require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "mock-api-key",
  // List of cities with their email requirement flag
  cities: {
    berlin: { requireEmail: true },
    london: { requireEmail: false },
    paris: { requireEmail: false },
    barcelona: { requireEmail: true },
    amsterdam: { requireEmail: true },
  },
  // Distance threshold for requiring email (in km)
  maxDistanceWithoutEmail: 30,
  // Price threshold for requiring email (in EUR)
  minPriceForEmail: 50,
  // Maximum allowed distance for a ride (in km)
  maxRideDistance: 1000,
};
