const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Regular expression to validate email
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          value
        );
      },
      message: 'Please Enter Valid Email',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [3, 'Password must be atleast 3 characters'],
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', userSchema);

//  ToDo
//  Unique Validation
//  caseInsensitive emails
// check for required field error
// try express validator bcoz with mongoose validation field check with mongoose validator during login seems tough or impossible
