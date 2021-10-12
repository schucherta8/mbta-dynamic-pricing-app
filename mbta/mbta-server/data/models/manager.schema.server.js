const mongoose = require('mongoose');
const managerSchema = mongoose.Schema({
    listOfAgents: Array,
});
module.exports = managerSchema;