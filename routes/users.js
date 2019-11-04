var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let User = require('../models/users');
let mongouri="mongodb+srv://Alaniskis:bibis159@reviewscluster-ybatl.mongodb.net/reviewsdb?retryWrites=true&w=majority";
mongoose.connect(mongouri);
let db = mongoose.connection;
let Fuse = require ('fuse.js');



db.on('error', function (err) {
  console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
  console.log('Successfully Connected to [ ' + db.name + ' ]');
});

var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "user"
    ]
};





router.findAll = (req, res) => {
  // Return a JSON representation of our list
  res.setHeader('Content-Type', 'application/json');

  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.send(JSON.stringify(users,null,5));
  });
}

router.findFuzzy = (req, res) => {
// Return a JSON representation of our list

    User.find(function(err, users) {
        if (err)
            res.send(err);
        else

            var fuse = new Fuse(users,options);
        var result = fuse.search(req.body.value);
        res.send({result});
    });

}

function getByValue(array, id) {
  var result  = array.filter(function(obj){return obj.id == id;} );
  return result ? result[0] : null; // or undefined
}

router.findOne = (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  User.find({ "_id" : req.params.id },function(err, user) {
    if (err)
      res.json({ message: 'User NOT Found!', errmsg : err } );
    else
      res.send(JSON.stringify(user,null,5));
  });
}

function getTotalVotes(array) {
  let totalVotes = 0;
  array.forEach(function(obj) { totalVotes += obj.userpoints; });
  return totalVotes;
}

router.addUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  var user = new User();

  user.user = req.body.user;
  user.address = req.body.address;
  user.gender = req.body.gender;

  user.save(function(err) {
    if (err)
      res.json({ message: 'User NOT Added!', errmsg : err } );
    else
      res.json({ message: 'User Successfully Added!', data: user });
  });
}

router.incrementUppoints = (req, res) => {
    User.findById(req.params.id, function(err,user) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else {
            user.userpoints += 1;
            user.save(function (err) {
                if (err)
                    res.json({ message: 'User NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'User Successfully Upvoted!', data: user });
            });
        }
    });
}

router.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.json({ message: 'User NOT DELETED!', errmsg : err } );
    else
      res.json({ message: 'User Successfully Deleted!'});
  });
}

router.findTotalVotes = (req, res) => {
  User.find(function(err, users) {
    if (err)
      res.send(err);
    else
      res.json({ totalvotes : getTotalVotes(users)  });
  });
}





module.exports = router;
