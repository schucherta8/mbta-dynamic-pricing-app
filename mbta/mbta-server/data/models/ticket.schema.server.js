const mongoose = require('mongoose');
const {getPrice} = require("../daos/mbtaSystem.dao.server");
const {getDistance} = require("../daos/mbtaSystem.dao.server");

const ticketSchema = mongoose.Schema({
        sourceStation: {type: mongoose.Schema.Types.Number, ref: 'StationModel'},
        destinationStation: {type: mongoose.Schema.Types.Number, ref: 'StationModel'},
        validity: Date,
        email: String,
        phone: Number,
        distance: Number,
        price: Number,
        transaction: {type: mongoose.Schema.Types.ObjectId, ref: 'TransactionModel'},
    },
    {collection: 'tickets'});
module.exports = ticketSchema;