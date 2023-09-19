const mongoose = require('mongoose');

const foodItems = new mongoose.Schema({
  // Define your schema fields here
  CategoryName: String,
  name: String,
  img: String,
  options: [
    {
      size: String,
      price: String,
    },
  ],
  description: String,

  // ...
});

// Create a Mongoose model for your collection
module.exports = mongoose.model('foodItems', foodItems);
