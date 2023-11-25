import request from "supertest";
import express from "express";
import router from "../calculateCarValue"; // Replace with the actual filename

const app = express();
app.use(express.json());
app.use("/car-value", router);

describe("Car Value API", () => {
  test("should calculate car value correctly", async () => {
    const response = await request(app)
      .post("/car-value")
      .send({ model: "Civic", year: 2000 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("car_value");
    expect(response.body.car_value).toBe(6600);
  });

  test("should handle invalid input", async () => {
    const response = await request(app)
      .post("/car-value")
      .send({ model: "Invalid123", year: "invalidYear" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Year must be a number");
  });

  // Add more test cases as needed
});
