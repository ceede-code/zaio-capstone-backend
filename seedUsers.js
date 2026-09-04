global.crypto = require('crypto'); 
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();




const users = [
  { username: 'John Doe', password: 'password123', role: 'user' },
  { username: 'Jane Doe', password: 'password321', role: 'host' }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Ceede-code:Langelihle10@thato.5ehud2a.mongodb.net/ ')
  .then(async () => {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Test credentials seeded successfully!');
    process.exit();
  })
  .catch(err => console.error(err));