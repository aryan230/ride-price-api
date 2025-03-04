const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const priceController = require("./controllers/priceController");
const validateRequest = require("./middleware/validateRequest");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post(
  "/api/check-email-requirement",
  validateRequest.priceCheckValidation,
  priceController.checkEmailRequirement
);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start the server
const PORT = config.port;
app.listen("5000", () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for testing
