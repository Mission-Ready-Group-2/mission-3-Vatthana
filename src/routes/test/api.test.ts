import request from "supertest";
import express from "express";
import calculateCarValueRoute from "../calculateCarValue"; // Replace with the actual filename
import calculateRiskRatingRoute from "../calculatingRisk"; // Replace with the actual filename
import calculateQuoteRoute from "../calculateQuote"; // Replace with the actual filename
const app = express();
app.use(express.json());
app.use("/calculate_car_value", calculateCarValueRoute);
app.use("/calculate_risk_rating", calculateRiskRatingRoute);
app.use("/calculate_quote", calculateQuoteRoute);

describe("Car Value API", () => {
  test("should calculate car value correctly", async () => {
    const response = await request(app)
      .post("/calculate_car_value")
      .send({ model: "Civic", year: 2000 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("car_value");
    expect(response.body.car_value).toBe(6600);
  });

  test("should handle invalid input", async () => {
    const response = await request(app)
      .post("/calculate_car_value")
      .send({ model: "Invalid123", year: "invalidYear" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Year must be a number");
  });

  test("should handle invalid year input", async () => {
    const response = await request(app).post("/calculate_car_value").send({
      model: "Civic", // Valid model
      year: "invalid", // Invalid year format
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Year must be a number");
  });

  test("should handle an empty model", async () => {
    const response = await request(app).post("/calculate_car_value").send({
      model: "", // Empty model name
      year: "2010", // Valid year
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Model is required");
  });

  it("should handle a negative year ", async () => {
    const response = await request(app).post("/calculate_car_value").send({
      model: "Civic", // Valid model
      year: -2010, // Negative year
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Year cannot be negative");
  });
});

describe("Claim History to Risk Rating API", () => {
  test("should calculate risk rating correctly", async () => {
    const response = await request(app)
      .post("/calculate_risk_rating")
      .send({ claimHistory: "crash, scratch, bump" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("risk_rating");
    expect(response.body.risk_rating).toBe(3);
  });

  test("should handle invalid input", async () => {
    const response = await request(app)
      .post("/calculate_risk_rating")
      .send({ claimHistory: 123 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid input");
  });

  test("should handle empty input", async () => {
    const response = await request(app)
      .post("/calculate_risk_rating")
      .send({ claimHistory: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Claim history cannot be empty");
  });

  // Add more test cases as needed
});

describe("Risk Rating to Quote API", () => {
  test("should calculate quote correctly", async () => {
    const response = await request(app)
      .post("/calculate_quote")
      .send({ carValue: 6614, riskRating: 5 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("monthly_premium");
    expect(response.body).toHaveProperty("yearly_premium");
    expect(response.body.monthly_premium).toBe("27.56");
    expect(response.body.yearly_premium).toBe("330.70");
  });
  it("should handle carValue is not a number", async () => {
    const response = await request(app)
      .post("/calculate_quote")
      .send({ carValue: "not a number", riskRating: 5 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid car value");
  });
  it("should handle riskRating is not a number", async () => {
    const response = await request(app)
      .post("/calculate_quote")
      .send({ carValue: 6614, riskRating: "not a number" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid risk rating");
  });
  it("should handle riskRating out of range", async () => {
    const response = await request(app)
      .post("/calculate_quote")
      .send({ carValue: 6614, riskRating: 6 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Risk rating must be between 1 and 5");
  });
});
