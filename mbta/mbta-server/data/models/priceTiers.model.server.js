const mongoose = require('mongoose');
const priceTiersSchema = require('./priceTiers.schema.server.js');
module.exports = mongoose.model('PriceModel', priceTiersSchema);