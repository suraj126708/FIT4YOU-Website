import express from "express";
import db from "../database/db.js";

const router = express.Router();

router.get("/trainers", (req, res) => {
  const query = `
        SELECT 
            t.name,
            t.qualifications,
            t.experienceYears,
            td.description,
            td.profilePic
        FROM 
            trainers t
        LEFT JOIN 
            trainer_details td ON t.id = td.trainer_id;
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
