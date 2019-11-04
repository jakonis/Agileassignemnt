let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Review = require('../models/reviews');
let mongouri="mongodb+srv://Alaniskis:bibis159@reviewscluster-ybatl.mongodb.net/reviewsdb?retryWrites=true&w=majority";
mongoose.connect(mongouri);
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Review.find(function(err, reviews) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(reviews,null,5));
    });
}

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Review.find({ "_id" : req.params.id },function(err, review) {
        if (err)
            res.json({ message: 'Review NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(review,null,5));
    });
}
function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

router.addReview = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var review = new Review();

    review.review = req.body.review;


    review.save(function(err) {
        if (err)
            res.json({ message: 'Teview NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Review Successfully Added!', data: review });
    });
}

router.incrementUpvotes = (req, res) => {

    Review.findById(req.params.id, function(err,review) {
        if (err)
            res.json({ message: 'Review NOT Found!', errmsg : err } );
        else {
            review.upvotes += 1;
            review.save(function (err) {
                if (err)
                    res.json({ message: 'Review NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Review Successfully Upvoted!', data: review });
            });
        }
    });
}

router.deleteReview = (req, res) => {

    Review.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Review NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Review Successfully Deleted!'});
    });
}

router.findTotalVotes = (req, res) => {

    Review.find(function(err, reviews) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(reviews) });
    });
}


module.exports = router;