const mongoose = require('mongoose');
const agentSchema = mongoose.Schema({
    listOfCustomers: Array,
});
module.exports = agentSchema;