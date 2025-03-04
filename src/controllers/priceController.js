const distanceService = require("../services/distanceService");
const pricingService = require("../services/pricingService");

/**
 * Check if email is required for a ride price check
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.checkEmailRequirement = async (req, res) => {
  try {
    const {
      pickup,
      destination,
      vehicleType = "Economy",
      isAirport = false,
    } = req.body;

    // Get distance between pickup and destination
    const distanceData = await distanceService.getDistance(pickup, destination);

    // Determine if email is required
    const result = await pricingService.checkEmailRequirement(
      pickup,
      destination,
      distanceData,
      vehicleType,
      isAirport
    );

    // Return only the boolean as requested
    return res.status(200).json(result.isEmailRequired);
  } catch (error) {
    console.error("Error checking email requirement:", error);

    if (error.message === "Too far to offer ride") {
      return res.status(400).json({
        success: false,
        message: "Too far to offer ride",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};
