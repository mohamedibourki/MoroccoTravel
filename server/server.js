const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5500" }));


// Stripe Api
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { priceInCents: 50000, name: "Flight To Paris" }],
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "mad",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Mysql Database
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "moroccotravel",
  port: 3306,
};

const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS Passengers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    age INT,
    phone VARCHAR(20),
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip VARCHAR(20),
    country VARCHAR(100)
  )
  `;

  connection.query(createTableQuery, (err, result) => {
    connection.release();
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
  });
});

app.post("/api/booking", (req, res) => {
  const { firstName, lastName, age, phone, email, address, city, state, zip, country } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool:", err);
      res.status(500).send("Error connecting to database");
      return;
    }

    const sql = "INSERT INTO Passengers (firstName, lastName, age, phone, email, address, city, state, zip, country) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [firstName, lastName, age, phone, email, address, city, state, zip, country], (err, result) => {
      connection.release();
      if (err) {
        console.error("Error saving data:", err);
        res.status(500).send("Error saving data");
      } else {
        res.status(201).send("Data saved successfully");
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});