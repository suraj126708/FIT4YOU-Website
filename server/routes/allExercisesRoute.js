import express from "express";
import TokenAuthMiddleware from "../middlewares/TokenAuthenticationMiddleware.js";
import pool from "../database/db.js";

const router = express.Router();

router.get("/workouts", TokenAuthMiddleware, (req, res) => {
  const userId = req.id;

  pool.query(
    `CALL GetUserWorkoutsSortedByDate(?)`,
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      res.status(200).json({
        success: true,
        workouts: results,
      });
    }
  );
});

router.get("/", TokenAuthMiddleware, (req, res) => {
  const userId = req.id;

  pool.query(
    `SELECT 
        u.fullName AS name, 
        u.email, 
        u.contactNumber AS mobile, 
        u.gender, 
        sp.plan_name AS membership, 
        u.dob AS joinDate, 
        t.name AS trainerName
     FROM users u
     LEFT JOIN trainers t ON u.trainer_id = t.id
     LEFT JOIN subscription_plans sp ON u.subscription_plan_id = sp.id 
     WHERE u.id = ?`,
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
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
    }
  );
});

export default router;
