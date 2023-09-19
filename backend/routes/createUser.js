const express = require('express');
const signupRoute = express.Router();
const User = require('../models/User');

signupRoute.post('/createuser', async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
    });

    if (user) res.json({ success: 'User Registered' });
  } catch (err) {
    res.json({ errorMessage: err });
  }
});

module.exports = signupRoute;
