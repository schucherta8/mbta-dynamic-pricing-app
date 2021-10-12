const mongoose = require('mongoose');
const stationSchema = require('./station.schema.server.js');
module.exports = mongoose.model('StationModel', stationSchema);