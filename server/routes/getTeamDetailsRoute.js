import express from "express";
import db from "../database/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT * FROM team";

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching team data", error: err });
    }

    res.status(200).json(results);
  });
});

export default router;
