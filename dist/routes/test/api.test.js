"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const calculateCarValue_1 = __importDefault(require("../calculateCarValue")); // Replace with the actual filename
const calculatingRisk_1 = __importDefault(require("../calculatingRisk")); // Replace with the actual filename
const calculateQuote_1 = __importDefault(require("../calculateQuote")); // Replace with the actual filename
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/calculate_car_value", calculateCarValue_1.default);
app.use("/calculate_risk_rating", calculatingRisk_1.default);
app.use("/calculate_quote", calculateQuote_1.default);
describe("Car Value API", () => {
    test("should calculate car value correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/calculate_car_value")
            .send({ model: "Civic", year: 2000 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("car_value");
        expect(response.body.car_value).toBe(6600);
    }));
    test("should handle invalid input", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/calculate_car_value")
            .send({ model: "Invalid123", year: "invalidYear" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Year must be a number");
    }));
    test("should handle invalid year input", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/calculate_car_value").send({
            model: "Civic",
            year: "invalid", // Invalid year format
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Year must be a number");
    }));
    test("should handle an empty model", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/calculate_car_value").send({
            model: "",
            year: "2010", // Valid year
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Model is required");
    }));
    it("should handle a negative year ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/calculate_car_value").send({
            model: "Civic",
            year: -2010, // Negative year
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Year cannot be negative");
    }));
});
describe("Claim History to Risk Rating API", () => {
    test("should calculate risk rating correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/calculate_risk_rating")
            .send({ claimHistory: "crash, scratch, bump" });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("risk_rating");
        expect(response.body.risk_rating).toBe(3);
    }));
    test("should handle invalid input", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/calculate_risk_rating")
            .send({ claimHistory: 123 });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Invalid input");
    }));
    test("should handle empty input", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/calculate_risk_rating")
            .send({ claimHistory: "" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Claim history cannot be empty");
    }));
    // Add more test cases as needed
});
describe("Risk Rating to Quote API", () => {
    test("should calculate quote correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/calculate_quote")
            .send({ carValue: 6614, riskRating: 5 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("monthly_premium");
        expect(response.body).toHaveProperty("yearly_premium");
        expect(response.body.monthly_premium).toBe("27.56");
        expect(response.body.yearly_premium).toBe("330.70");
    }));
    it("should handle carValue is not a number", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/calculate_quote")
            .send({ carValue: "not a number", riskRating: 5 });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Invalid car value");
    }));
    it("should handle riskRating is not a number", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/calculate_quote")
            .send({ carValue: 6614, riskRating: "not a number" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Invalid risk rating");
    }));
    it("should handle riskRating out of range", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/calculate_quote")
            .send({ carValue: 6614, riskRating: 6 });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Risk rating must be between 1 and 5");
    }));
});
