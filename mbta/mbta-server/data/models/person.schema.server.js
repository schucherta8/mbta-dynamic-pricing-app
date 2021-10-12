const mongoose = require('mongoose');
const adminSchema = require('./admin.schema.server');
const managerSchema = require('./manager.schema.server');
const agentSchema = require('./agent.schema.server');
const customerSchema = require('./customer.schema.server');
const helpPointSchema = require('./helpPoint.schema.server');

const personSchema = mongoose.Schema({
        // _id: Number,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: Number,
        userType: {type: String, enum: ["Admin", "Manager", "Agent", "Customer", "Info_point", "Guest"]},
        admin: adminSchema,
        manager: managerSchema,
        agent: agentSchema,
        customer: customerSchema,
        helpPoint: helpPointSchema,
            transaction: {type: mongoose.Schema.Types.ObjectId, ref: 'TransactionModel'}
    },
    {collection: 'persons'});
module.exports = personSchema;