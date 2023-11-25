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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/car-value", calculateCarValue_1.default);
describe("Car Value API", () => {
    test("should calculate car value correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/car-value")
            .send({ model: "Civic", year: 2000 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("car_value");
        expect(response.body.car_value).toBe(6600);
    }));
    test("should handle invalid input", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/car-value")
            .send({ model: "Invalid123", year: "invalidYear" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Year must be a number");
    }));
    // Add more test cases as needed
});
