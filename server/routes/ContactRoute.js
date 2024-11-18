import express from "express";
import pool from "../database/db.js";

const router = express.Router();

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "INSERT INTO contact_us (name, email, message) VALUES (?, ?, ?)";

  pool.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while saving the message" });
    }

    res
      .status(200)
      .json({ message: "Your message has been sent successfully!" });
  });
});

export default router;
