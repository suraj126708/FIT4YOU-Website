import express from "express";
import TokenAuthMiddleware from "../middlewares/TokenAuthenticationMiddleware.js";
import pool from "../database/db.js";
import ensureAuthenticated from "../middlewares/Auth.js";

const router = express.Router();

router.post("/", ensureAuthenticated, TokenAuthMiddleware, (req, res) => {
  const { exercise_name, duration, burnt_calories, description } = req.body;

  const workoutDate = new Date().toISOString().split("T")[0];

  pool.query(
    `INSERT INTO user_workouts (user_id, exercise_name, duration, burnt_calories, description, workout_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      req.id,
      exercise_name,
      duration,
      burnt_calories,
      description || null,
      workoutDate,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      res.status(201).json({
        success: true,
        message: "Workout added successfully!",
        id: result.insertId,
      });
    }
  );
});

export default router;
