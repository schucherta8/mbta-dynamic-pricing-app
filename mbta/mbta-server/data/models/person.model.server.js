const mongoose = require('mongoose');
const personSchema = require('./person.schema.server');
module.exports = mongoose.model('PersonModel', personSchema);