const mongoose = require('mongoose');

const priceDistanceSchema = mongoose.Schema({
        distance: Number,
        price: Number
    },
    {collection: 'priceDistance'});
module.exports = priceDistanceSchema;