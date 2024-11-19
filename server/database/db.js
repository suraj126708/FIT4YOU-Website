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

// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config();

// // Define the connection URL
// const connectionUrl =
//   "mysql://sql12745582:AJJyuvnlCd@sql12.freesqldatabase.com:3306/sql12745582";

// // Create the pool using the connection URL
// const pool = mysql.createPool(connectionUrl);

// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error("❌ Database connection failed:");
//     console.error("Error Code:", err.code);
//     console.error("Error Message:", err.message);
//     process.exit(1);
//   }

//   console.log("✅ Connected to MySQL database.");
//   connection.release(); // Release the connection back to the pool
// });

// // Handle any pool errors
// pool.on("error", (err) => {
//   console.error("⚠️ MySQL error:", err.code, err.message);
// });

// // Export the pool for use in other parts of the application
// export default pool;
