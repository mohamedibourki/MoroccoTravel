// Import required modules
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

// Middleware setup
app.use(express.json());
app.use(cors({ origin: "http://localhost:5500" }));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "MoroccoTravel",
  port: 3306,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");

  // SQL query to create the 'bookings' table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    )
  `;

  // Execute the SQL query to create the table
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log("Table created successfully");
  });
});

// POST route for booking
app.post("/api/booking", (req, res) => {
  console.log("POST request received at /api/booking");
  const { name, email } = req.body;
  console.log("Received data:", name, email);
  
  const sql = "INSERT INTO bookings (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error("Error saving data:", err);
      res.status(500).send("Error saving data");
    } else {
      console.log("Data saved successfully");
      res.status(201).send("Data saved successfully");
    }
  });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
