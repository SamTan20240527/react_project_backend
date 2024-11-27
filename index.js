//First time setup:
//  npm init -y
//  npm install express mysql2 cors dotenv bcrypt jsonwebtoken stripe(optional)
//Subsequent re-start:
//  node index.js

const express = require('express');
//Enable cross origin resources sharing
const cors = require('cors');
require('dotenv').config();
//Call database.js to connect to MySQL
const pool = require('./database');
//Register products router
const productsRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the E-Shop API" });
});

//To test: GET http://localhost:3000/api/products
app.use('/api/products', productsRoutes);

//To test: GET http://localhost:3000/api/users
app.use('/api/users', userRoutes);

// Start the server: node index.js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});