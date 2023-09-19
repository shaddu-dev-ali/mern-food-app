const express = require('express');
const Order = require('../models/OrderData');
const orderRoute = express.Router();

orderRoute.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, {
    Order_date: req.body.order_date,
  });
  let eId = await Order.findOne({ email: req.body.email });
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.json('Server Error', error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.json('Server Error', error.message);
    }
  }
});

orderRoute.post('/myOrderData', async (req, res) => {
  try {
    // console.log(req.body.email);
    let data = await Order.findOne({
      email: req.body.email,
    });
    //console.log(eId)
    res.json({ orderData: data });
  } catch (error) {
    res.send('Error', error.message);
  }
});

module.exports = orderRoute;
