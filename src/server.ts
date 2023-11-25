import express from "express";
import bodyParser from "body-parser";
import CarValueAPI from "./routes/calculateCarValue.js";
import RiskRatingAPI from "./routes/calculatingRisk.js";
import QuoteAPI from "./routes/calculateQuote.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

// CORS
app.use(cors());
app.use(bodyParser.json());
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
app.use("/calculate_car_value", CarValueAPI);

// API 2. Convert "Claim History" to a "Risk Rating"
app.use("/calculate_risk_rating", RiskRatingAPI);

// API 3. Calculate the "Premium" based on the "Risk Rating"
app.use("/calculate_quote", QuoteAPI);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
