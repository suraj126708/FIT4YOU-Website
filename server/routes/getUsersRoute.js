import express from "express";
import ensureAuthenticated from "../middlewares/Auth.js";
import db from "../database/db.js";

const router = express.Router();

function getAllUsers(callback) {
  db.query("CALL GetAllUsersWithDetails()", (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
}

router.get("/getUsersRoute", ensureAuthenticated, (req, res) => {
  getAllUsers((err, users) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      success: true,
      data: users[0],
    });
  });
});

export default router;
