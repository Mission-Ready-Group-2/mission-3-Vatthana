"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// API 3. Calculate the "Premium insurance" based on the "Risk Rating"
// This function will calculate the premium insurance based on the car value and risk rating
function calculateQuote(carValue, riskRating) {
    try {
        // Check for invalid input
        if (isNaN(carValue)) {
            return { error: "Invalid car value" };
        }
        // Check for invalid input
        if (isNaN(riskRating)) {
            return { error: "Invalid risk rating" };
        }
        // Check for empty input
        if (riskRating < 1 || riskRating > 5) {
            return { error: "Risk rating must be between 1 and 5" };
        }
        // Calculate the premium insurance based on the business rules
        const yearlyPremium = (carValue * riskRating) / 100;
        // Calculate the monthly premium insurance by dividing the yearly premium by 12
        const monthlyPremium = yearlyPremium / 12;
        // Return the premium insurance as an object with 2 decimal places
        return {
            monthly_premium: monthlyPremium.toFixed(2),
            yearly_premium: yearlyPremium.toFixed(2),
        };
    }
    catch (e) {
        return { error: "There is an error" };
    }
}
router.post("/", (req, res) => {
    try {
        // extract the car value and risk rating from the request body using destructuring
        const { carValue, riskRating } = req.body;
        // calculate the quote
        const result = calculateQuote(carValue, riskRating);
        // Check if there is an error in the result object
        if ("error" in result) {
            return res.status(400).json(result);
        }
        // if there is no error, return the result as a json object
        return res.json(result);
    }
    catch (e) {
        return res.status(500).json({ error: "An error occurred" });
    }
});
exports.default = router;
