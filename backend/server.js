const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const signupRoute = require('./routes/createUser');
const loginRoute = require('./routes/loginUser');
const displayRoute = require('./routes/displayData');
const orderRoute = require('./routes/orderRoute');

mongoose
  .connect('mongodb://127.0.0.1:27017/foodApp')
  .then(() => console.log('DB Connected'));

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api', displayRoute);
app.use('/api', orderRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
