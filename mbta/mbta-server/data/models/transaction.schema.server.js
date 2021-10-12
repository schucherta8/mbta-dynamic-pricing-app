const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'PersonModel'},
    ticket: {type: mongoose.Schema.Types.ObjectId, ref: 'TicketModel'},
    timeOfTransaction : {type : Date, default : Date.now}
}, {collection: 'transactions'});
module.exports = transactionSchema;