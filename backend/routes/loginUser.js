const express = require('express');
const loginRoute = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = 'Iamshadabtryingtolearnfullstackdevelopment';

loginRoute.post('/loginuser', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await User.find({ email });

    if (!user) {
      return res.json({ failure: 'User Not found' });
    }
    if (password !== user.password) {
      return res.json({ failure: 'User Not found' });
    }
    const data = {
      user: user.id,
    };
    const authToken = jwt.sign(data, secret);
    return res.json({
      success: 'User found and LoggedIn',
      authToken: authToken,
      email: email,
    });
  } catch (err) {
    console.log(err);
    res.json({ errorMessage: err });
  }
});

module.exports = loginRoute;
