"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateCarValue_1 = require("../calculateCarValue");
const chai_1 = require("chai");
describe("calculateCarValue", () => {
    it("should calculate the car value correctly based on the model and year", () => {
        const model = "Toyota Camry";
        const year = 2018;
        const result = (0, calculateCarValue_1.calculateCarValue)(model, year);
        (0, chai_1.expect)(result).to.equal(25000);
    });
});
