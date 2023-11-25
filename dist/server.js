"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const calculateCarValue_js_1 = __importDefault(require("./routes/calculateCarValue.js"));
const calculatingRisk_js_1 = __importDefault(require("./routes/calculatingRisk.js"));
const calculateQuote_js_1 = __importDefault(require("./routes/calculateQuote.js"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const router = express_1.default.Router();
const port = process.env.PORT || 8080;
// CORS
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send(`
    <h1>Welcome to the Car Insurance API!</h1>
    <p>Here are the available routes:</p>
    <ol>
      <li>
        <strong>POST /calculate_car_value</strong><br>
        Use this route to calculate the value of a car.
      </li>
      <li>
        <strong>POST /calculate_risk_rating</strong><br>
        Use this route to calculate the risk rating.
      </li>
      <li>
        <strong>POST /calculate_quote</strong><br>
        Use this route to calculate the quote.
      </li>
    </ol>
  `);
});
// API 1. Calculate car value
app.use("/calculate_car_value", calculateCarValue_js_1.default);
// API 2. Convert "Claim History" to a "Risk Rating"
app.use("/calculate_risk_rating", calculatingRisk_js_1.default);
// API 3. Calculate the "Premium" based on the "Risk Rating"
app.use("/calculate_quote", calculateQuote_js_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
