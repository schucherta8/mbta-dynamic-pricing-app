const mongoose = require('mongoose');
const ticketSchema = require('./ticket.schema.server.js');
module.exports = mongoose.model('TicketModel', ticketSchema);