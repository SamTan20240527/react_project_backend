//First time setup:
//  npm init -y
//  npm install express mysql2 cors dotenv bcrypt jsonwebtoken stripe(optional)
//Subsequent re-start:
//  node index.js

//Part 11: Create productsRoutes

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./database');

//Register products, user & cart routes
const productsRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

// Basic route: http://localhost:3000/
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our e-commerce API' });
});

// Start the server: node index.js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});