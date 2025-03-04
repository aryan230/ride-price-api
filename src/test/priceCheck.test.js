const request = require("supertest");
const app = require("../src/app");
const distanceService = require("../src/services/distanceService");
const config = require("../src/config/config");

// Mock the distance service
jest.mock("../src/services/distanceService");

describe("Price Check API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should return true when email is required (distance > 30km)", async () => {
    // Mock distance service to return distance > 30km
    distanceService.getDistance.mockResolvedValue({
      distance: 35, // More than 30km
      city: "London",
    });

    const response = await request(app)
      .post("/api/check-email-requirement")
      .send({
        pickup: "123 London Street, London",
        destination: "456 Far Away Lane, London",
        vehicleType: "Economy",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(true); // Email is required
  });

  test("should return false when email is not required (London, < 30km, > €50)", async () => {
    // Mock distance service to return distance < 30km for London
    distanceService.getDistance.mockResolvedValue({
      distance: 20, // Less than 30km
      city: "London", // London doesn't require email
    });

    const response = await request(app)
      .post("/api/check-email-requirement")
      .send({
        pickup: "123 Central London",
        destination: "456 London Bridge",
        vehicleType: "Minivan", // Expensive option to ensure price > €50
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(false); // Email is not required
  });

  test("should return true when city requires email (Berlin)", async () => {
    // Mock distance service to return Berlin (which requires email)
    distanceService.getDistance.mockResolvedValue({
      distance: 10, // Short distance
      city: "Berlin", // Berlin requires email
    });

    const response = await request(app)
      .post("/api/check-email-requirement")
      .send({
        pickup: "Berlin Hauptbahnhof",
        destination: "Brandenburg Gate, Berlin",
        vehicleType: "Economy",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(true); // Email is required
  });

  test("should return 400 error when distance is too far", async () => {
    // Mock distance service to return distance > max allowed
    distanceService.getDistance.mockResolvedValue({
      distance: config.maxRideDistance + 10, // More than max allowed
      city: "London",
    });

    const response = await request(app)
      .post("/api/check-email-requirement")
      .send({
        pickup: "London, UK",
        destination: "Tokyo, Japan",
        vehicleType: "Economy",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Too far to offer ride");
  });

  test("should return 400 error with validation errors for invalid input", async () => {
    const response = await request(app)
      .post("/api/check-email-requirement")
      .send({
        // Missing pickup address
        destination: "London Bridge",
        vehicleType: "InvalidType",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});
