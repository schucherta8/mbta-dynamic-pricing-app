const mongoose = require('mongoose');

const priceTiersSchema = mongoose.Schema({
        tier1: Number,
        tier2: Number,
        tier3: Number,
        tier4: Number,
        threshold1: Number,
        threshold2: Number,
        threshold3: Number,
        threshold4: Number
    },
    {collection: 'priceTiers'});
module.exports = priceTiersSchema;