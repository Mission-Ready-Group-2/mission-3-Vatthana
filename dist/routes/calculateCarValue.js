"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCarValue = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//  API 1 - Calculate car value
// This function will calculate the car value based on the model and year
function calculateCarValue(model, year) {
    try {
        if (!model) {
            return { error: "Model is required" };
        }
        if (!year) {
            return { error: "Year is required" };
        }
        if (isNaN(year)) {
            return { error: "Year must be a number" };
        }
        if (year < 0) {
            return { error: "Year cannot be negative" };
        }
        // Remove spaces and convert the model name to uppercase
        model = model.replace(/ /g, "").toUpperCase();
        // Check for invalid model or year
        // So, this regular expression will match any string that consists only of one or more uppercase letters and nothing else like "HELLO" not " HELLO12"
        if (!model.match(/^[A-Z]+$/) || isNaN(year)) {
            // Check for invalid model
            if (!model.match(/^[A-Z]+$/)) {
                return { error: "Invalid model" };
                // Check for invalid year
            }
            else {
                return { error: "Invalid year" };
            }
        }
        // Calculate the value based on the business rules
        const value = model
            .split("")
            // charCodeAt() will return the ASCII code of the character and we subtract the ASCII code of "A" from it and add 1 to get the value of the character
            .map((char) => char.charCodeAt(0) - "A".charCodeAt(0) + 1)
            .reduce((acc, curr) => acc + curr, 0) *
            100 +
            +year;
        // Return the value as an object
        return { car_value: value };
    }
    catch (e) {
        return { error: "There is an error" };
    }
}
exports.calculateCarValue = calculateCarValue;
router.post("/", (req, res) => {
    try {
        const { model, year } = req.body;
        const result = calculateCarValue(model, year);
        // Check if there is an error in the result object
        if ("error" in result) {
            return res.status(400).json(result);
        }
        //  if there is no error, return the result as a json object
        return res.json(result);
    }
    catch (e) {
        return res.status(500).json({ error: "An error occurred" });
    }
});
exports.default = router;
