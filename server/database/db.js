import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:");
    console.error("Error Code:", err.code);
    console.error("Error Message:", err.message);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL database.");
  connection.release();
});

pool.on("error", (err) => {
  console.error("⚠️ MySQL error:", err.code, err.message);
});

export default pool;
