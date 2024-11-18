import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";

// Register User
export const registerUser = (req, res) => {
  const {
    fullName,
    dob,
    gender,
    contactNumber,
    email,
    username,
    password,
    address,
  } = req.body;

  const profilePic = req.file?.path || null;
  const subscriptionPlanID = 1 || null; // Default to 1 if not provided

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password should be at least 6 characters" });
  }

  // Check if email or username already exists
  const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
  pool.query(checkQuery, [email, username], (err, checkResult) => {
    if (err) {
      console.error("Error checking existing user:", err);
      return res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }

    if (checkResult.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or Username already exists" });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res
          .status(500)
          .json({ error: "Internal server error", details: err.message });
      }

      // Insert user data into the database
      const query = `
        INSERT INTO users 
        (fullName, dob, gender, contactNumber, email, username, password, profilePic, address, subscription_plan_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        fullName,
        dob,
        gender,
        contactNumber,
        email,
        username,
        hashedPassword,
        profilePic,
        address,
        subscriptionPlanID,
      ];

      pool.query(query, values, (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res
            .status(500)
            .json({ error: "Internal server error", details: err.message });
        }

        res.status(201).json({ message: "User registered successfully!" });
      });
    });
  });
};

// Login User
export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const errMessage = "Invalid email or password!";

  // Check for missing email or password in request body
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      success: false,
    });
  }

  // Check if the email exists and select only the needed fields
  pool.query(
    "SELECT id, email, password, fullName, profilePic FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Error querying user:", err);
        return res.status(500).json({
          message: "Error during login",
          success: false,
        });
      }

      if (results.length === 0) {
        console.error(`Login failed: email not found - ${email}`);
        return res.status(403).json({ message: errMessage, success: false });
      }

      const user = results[0];

      // Compare passwords
      bcrypt.compare(password, user.password, (err, isPasswordValid) => {
        if (err) {
          console.error("Error comparing password:", err);
          return res.status(500).json({
            message: "Error during login",
            success: false,
          });
        }

        if (!isPasswordValid) {
          console.error(`Login failed: invalid password for email - ${email}`);
          return res.status(403).json({ message: errMessage, success: false });
        }

        // Create JWT token with a 1-day expiration time
        const jwtToken = jwt.sign(
          { email: user.email, _id: user.id },
          process.env.JWT_TOKEN,
          { expiresIn: "1d" } // 1 day expiry
        );

        // Respond with successful login details
        res.status(200).json({
          message: "Login successful",
          success: true,
          token: jwtToken,
          user: {
            email: user.email,
            name: user.fullName,
            profilePicture: user.profilePic,
          },
        });
      });
    }
  );
};
