// URI = mongodb+srv://Ceede-code:Langelihle10@thato.5ehud2a.mongodb.net/ 

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();
// const crypto = require('crypto');
// global.crypto = crypto;

// // Import routes
// const userRoutes = require('./routes/userRoutes');
// const accommodationRoutes = require('./routes/accommodationRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect('mongodb+srv://Ceede-code:Langelihle10@thato.5ehud2a.mongodb.net/')
//   .then(() => {
//     console.log('MongoDB connected successfully');
//   })
//   .catch((error) => {
//     console.log('MongoDB connection error:', error);
//   });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

global.crypto = require('crypto');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes as per rubric says
app.use('/api/users', userRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Ceede-code:Langelihle10@thato.5ehud2a.mongodb.net/ ';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));







































// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Route for Home Page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'home.html'));
// });

// // Route for Home Page (alternative)
// app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'home.html'));
// });

// // Route for Admin Login
// app.get('/admin-login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'Admin-login.html'));
// });

// // Route for Customer Login
// app.get('/customer-login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'customer-login.html'));
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log('Available routes:');
//     console.log('- Home: http://localhost:3000/');
//     console.log('- Admin Login: http://localhost:3000/admin-login');
//     console.log('- Customer Login: http://localhost:3000/customer-login');
// });