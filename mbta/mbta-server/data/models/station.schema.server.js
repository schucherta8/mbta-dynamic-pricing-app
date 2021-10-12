const mongoose = require('mongoose');
const stationSchema = mongoose.Schema({
    _id: Number,
    name: String,
    latitude: Number,
    longitude: Number,
    facilities: Array,
}, {collection: 'stations'});
module.exports = stationSchema;