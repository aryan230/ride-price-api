const { body, validationResult } = require("express-validator");

/**
 * Validation rules for price check endpoint
 */
exports.priceCheckValidation = [
  body("pickup")
    .isString()
    .notEmpty()
    .withMessage("Pickup address is required"),

  body("destination")
    .isString()
    .notEmpty()
    .withMessage("Destination address is required"),

  body("vehicleType")
    .optional()
    .isIn(["Economy", "Comfort", "Minivan"])
    .withMessage("Vehicle type must be Economy, Comfort, or Minivan"),

  body("isAirport")
    .optional()
    .isBoolean()
    .withMessage("isAirport must be a boolean"),

  // Validate the request
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }

    next();
  },
];
