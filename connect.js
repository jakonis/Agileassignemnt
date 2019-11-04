// var mongoose = require('mongoose');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/reviewsdb");

// mongoose.connect('mongodb://localhost:27017/reviewsdb');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});