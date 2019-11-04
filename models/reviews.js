let mongoose = require('mongoose');

let ReviewSchema = new mongoose.Schema({
        review: String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'reviews' });

module.exports = mongoose.model('Review', ReviewSchema);