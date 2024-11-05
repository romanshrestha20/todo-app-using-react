const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

// Determine the database name based on the environment
const databaseName =
  process.env.NODE_ENV === "test"
    ? process.env.DB_NAME_TEST
    : process.env.DB_NAME_DEV;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: databaseName,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to set up the test database
const setupTestDatabase = async () => {
  if (process.env.NODE_ENV === "test") {
    const sqlFile = path.join(__dirname, "setup_test_db.sql");
    const sql = fs.readFileSync(sqlFile, "utf8");

    try {
      await pool.query(sql);
      console.log("Test database set up successfully.");
    } catch (err) {
      console.error("Error setting up test database:", err);
    }
  }
};

// Call this function before your tests
setupTestDatabase();

pool.on("connect", () => {
  console.log("Connected to the database successfully");
});

module.exports = pool;
