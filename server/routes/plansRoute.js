import express from "express";
import db from "../database/db.js";

const router = express.Router();

router.get("/subscription-plans", (req, res) => {
  const query = `
         SELECT *
    FROM subscription_plans
    WHERE access_level != 'Basic' AND duration = 'Monthly'
    ORDER BY price DESC;
    `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
});

export default router;
