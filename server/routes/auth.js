import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import upload from "../database/fileUpload.js";
import ensureAuthenticated from "../middlewares/Auth.js";
import db from "../database/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Existing Routes
router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);

router.get("/verify", ensureAuthenticated, (req, res) => {
  res.json({ message: "You have access!", user: req.user });
});

router.post("/change-password", (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: "New password is required" });
  }

  db.execute("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the user" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(oldPassword, user.password, (err, isOldPasswordCorrect) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "An error occurred during password comparison" });
      }

      if (!isOldPasswordCorrect) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      db.execute(
        "SELECT password FROM user_logs WHERE user_id = ? ORDER BY change_date DESC",
        [user.id],
        (err, logs) => {
          if (err) {
            return res.status(500).json({
              message: "An error occurred while fetching password history",
            });
          }

          const passwordExistsInHistory = logs.some((log) =>
            bcrypt.compareSync(newPassword, log.password)
          );

          if (passwordExistsInHistory) {
            return res.status(400).json({
              message: "New password must be different from the old passwords",
            });
          }

          bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) {
              return res.status(500).json({
                message: "An error occurred while hashing the new password",
              });
            }

            db.execute(
              "INSERT INTO user_logs (user_id, password) VALUES (?, ?)",
              [user.id, user.password],
              (err) => {
                if (err) {
                  return res.status(500).json({
                    message: "An error occurred while logging the old password",
                  });
                }

                db.execute(
                  "UPDATE users SET password = ? WHERE email = ?",
                  [hashedPassword, email],
                  (err) => {
                    if (err) {
                      return res.status(500).json({
                        message:
                          "An error occurred while updating the password",
                      });
                    }

                    res
                      .status(200)
                      .json({ message: "Password changed successfully" });
                  }
                );
              }
            );
          });
        }
      );
    });
  });
});

router.get("/password-history/:email", (req, res) => {
  const email = req.params.email;

  db.execute(
    "SELECT * FROM user_logs WHERE user_id = (SELECT id FROM users WHERE email = ?) ORDER BY change_date DESC",
    [email],
    (err, logs) => {
      if (err) {
        return res.status(500).json({
          message: "An error occurred while fetching the password history",
        });
      }

      if (logs.length === 0) {
        return res
          .status(404)
          .json({ message: "No password history found for this user" });
      }

      res.status(200).json(logs);
    }
  );
});

export default router;
