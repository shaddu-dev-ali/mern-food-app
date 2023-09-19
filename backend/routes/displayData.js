const express = require('express');
const Items = require('../models/Items');
const Category = require('../models/Category');
const displayRoute = express.Router();

displayRoute.post('/displayitems', async (req, res) => {
  try {
    const categories = await Category.find({});
    const items = await Items.find({});

    res.json({ categories, items });
  } catch (err) {
    res.json({ errorMessage: err });
  }
});

module.exports = displayRoute;
