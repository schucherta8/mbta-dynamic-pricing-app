const mongoose = require('mongoose');
const transactionSchema = require('./transaction.schema.server.js');
module.exports = mongoose.model('TransactionModel', transactionSchema);