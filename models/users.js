"use strict";

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  user: String,
  address: String,
  gender: String,
  userpoints: {
    type: Number,
    default: 0
  }
}, {
  collection: 'users'
});
module.exports = mongoose.model('User', UserSchema);