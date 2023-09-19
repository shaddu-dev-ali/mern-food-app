const mongoose = require('mongoose');

const foodCategory = new mongoose.Schema({
  CategoryName: String,
});

// Create a Mongoose model for your collection
module.exports = mongoose.model(
  'foodCategory',
  foodCategory
);
