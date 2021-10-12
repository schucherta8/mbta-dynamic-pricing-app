const mongoose = require('mongoose');
const priceDistanceSchema = require('./priceDistance.schema.server.js');
module.exports = mongoose.model('PriceDistanceModel', priceDistanceSchema);