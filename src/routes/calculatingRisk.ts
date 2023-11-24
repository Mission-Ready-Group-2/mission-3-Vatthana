import express from "express";

const router = express.Router();

interface RiskRatingResult {
  risk_rating: number;
}

// API 2. Convert "Claim History" to a "Risk Rating"

// This function will calculate the risk rating based on the claim history
export function calculateRiskRating(claimHistory: string) {
  try {
    // Check for invalid input
    if (typeof claimHistory !== "string") {
      return { error: "Invalid input" };
    }
    // Check for empty input
    if (claimHistory === "") {
      return { error: "Claim history cannot be empty" };
    }

    // Convert the claim history to lowercase
    claimHistory = claimHistory.toLowerCase();

    // Calculate the risk rating based on the business rules (keywords)
    const keywords = ["collide", "crash", "scratch", "bump", "smash"];

    // Set the initial risk rating to 0
    let riskRating = 0;

    for (const keyword of keywords) {
      // For each keyword, a new regular expression object is created.
      // The "g" flag means the search should be global (i.e., it should find all matches rather than stopping after the first match), and the "i" flag means the search should be case-insensitive.
      const keywordRegex = new RegExp(keyword, "gi");
      const matches = claimHistory.match(keywordRegex);
      if (matches) {
        riskRating += 1;
      }
    }

    // The risk rating cannot be more than 5 or less than 1
    if (riskRating > 5) {
      riskRating = 5;
    }
    if (riskRating < 1) {
      riskRating = 1;
    }

    // Return the risk rating as an object
    return { risk_rating: riskRating };
  } catch (e) {
    return { error: "There is an error" };
  }
}

router.post("/", (req, res) => {
  try {
    const { claimHistory } = req.body;

    const result = calculateRiskRating(claimHistory);

    // Check if there is an error in the result object
    if ("error" in result) {
      return res.status(400).json(result);
    }

    // if there is no error, return the result as a json object
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
