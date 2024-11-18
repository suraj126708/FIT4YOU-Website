import express from "express";
import pool from "../database/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  pool.query(`call GetStatistics;`, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      ...results[0],
    });
  });
});

export default router;
