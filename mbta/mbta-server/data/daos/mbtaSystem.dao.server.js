const stationModel = require('../models/station.model.server');
const personModel = require('../models/person.model.server');
const ticketModel = require('../models/ticket.model.server');
const transactionModel = require('../models/transaction.model.server');
const priceTiersModel = require('../models/priceTiers.model.server');
const priceDistance = require('../models/priceDistance.model.server');
const fetch = require("node-fetch");
const userExists = Error("Username already exists.");

/*******************************************************************************
 *                                                                             *
 *                                 USER OPERATIONS                             *
 *                                                                             *
 ******************************************************************************/

/*
* Create a user
*/
createPerson = person => {
    const temp = getPersonByUsername(person.username);
    return temp.then(temp => {
        if (temp === null) {
            personModel.create(person);
        } else {
            return userExists;
        }
    })
};

/*
* Get all users
*/
findAllPersons = () => personModel.find();

/*
* Get a user by their ID
*/
findPersonById = personId => personModel.findById(personId);

/*
* Get a user by their username
*/
getPersonByUsername = (username) => {
    return personModel.findOne({username: username});
};

/*
* Get a user by user type
*/
getUserByUserType = (userType) => {
    return personModel.find({userType: userType})
};

/*
* Update a person
*/
updatePerson = (person) => {
    var temp = getPersonByUsername(person.username);
    return temp.then(temp => {
        console.log("temp data: " + temp);
        return personModel.updateOne({_id: person._id}, {$set: person});
    });
};

/*
* Delete a person by username
*/
deletePerson = name => personModel.deleteOne({username: name});

/*******************************************************************************
 *                                                                             *
 *                                 STATION OPERATIONS                          *
 *                                                                             *
 ******************************************************************************/

/*
* Create a station
*/
createStation = station => stationModel.create(station);

/*
* Retrieve all stations 
*/
findAllStations = () => stationModel.find();

/*
* Retrieve station by ID
*/
findStationById = stationId => stationModel.findById(stationId);

/*
* Retrieve station by Name
*/
findStationByName = stationName => stationModel.findOne({name: stationName});

/*
* Update station by ID
*/
updateStation = (station) => stationModel.updateOne({_id: station._id}, {$set: station});

/*
* Delete a station by ID
*/
deleteStation = stationId => stationModel.deleteOne({_id: stationId});

/*******************************************************************************
 *                                                                             *
 *                                 TICKET OPERATIONS                           *
 *                                                                             *
 ******************************************************************************/

/*
* Create a ticket
*/
createTicket = ticket => ticketModel.create(ticket);

/*
* Get all tickets
*/
findAllTickets = () => ticketModel.find();

/*
* Get a ticket by ID
*/
findTicketById = ticketId => ticketModel.findById(ticketId);

/*
* Update a ticket by ticket ID
*/
updateTicketByUser = (ticket) => ticketModel.updateOne({_id: ticket._id}, {$set: ticket});

/*
* Delete a ticket by ID
*/
deleteTicket = ticketId => ticketModel.deleteOne({_id: ticketId}, function (err, obj) {
    if (err) throw err;
    console.log("ticket deletion successful");
}),
    updateTicket = (ticketId, ticket) => ticketModel.updateOne({_id: ticketId}, {$set: ticket});

/*******************************************************************************
 *                                                                             *
 *                                 TRANSACTION OPERATIONS                      *
 *                                                                             *
 ******************************************************************************/

createTransaction = transaction => transactionModel.create(transaction);
deleteTransaction = transactionId => transactionModel.deleteOne({_id: transactionId});
updateTransaction = (transaction) => transactionModel.updateOne({_id: transaction._id}, {$set: transaction});

findAllTransactions = () => transactionModel.find().sort({_id: -1});
findTransactionById = transactionId => transactionModel.findById(transactionId);
findTransactionByCustomerId = customerId => transactionModel.find({customer: customerId});

findTransactionByUserNamePromise = (username) => Promise.all(
    [findTransactionsByUsername(username)]);

findTransactionsByUsername = (username) => {
    return getPersonByUsername(username)
        .then(person => {
            return findTransactionByCustomerId(person._id);
        });
};

generateTransaction = (username, source, destination) => Promise.all(
    [createTransactionWithUsername(username, source, destination)]);

createTransactionWithUsername = (username, source, destination) => {
    const person = getPersonByUsername(username);
    person.then(data => {
        createTransactionForTicket(data._id, source, destination)
    })
};

createTransactionForTicket = (customerId, source, destination) => {
    // Document retrieval based on input station IDs
    var src = findStationByName(source);
    var dst = findStationByName(destination);

    console.log("Customer ID: " + customerId);
    console.log("Source: " + source);
    console.log("Destination: " + destination);
    var distance = src.then(src => dst
        .then(dst => getDistance(src.latitude, src.longitude, dst.latitude, dst.longitude)));

    var ticket;
    var price;

    return src.then(src => dst.then(dst => distance.then((distance => {
        price = getPrice(distance)
            .then(price =>
                ticket = createTicket({
                    sourceStation: src._id, destinationStation: dst._id,
                    distance: distance, price: price
                }))
            .then(ticket => createTransaction({customer: customerId, ticket: ticket._id}))
    }))))
};

// createTransactionForTicket = (customerId, source, destination) => {
//     // Document retrieval based on input station IDs
//     var src = findStationByName(source);
//     var dst = findStationByName(destination);
//
//     var distance = src.then(src => dst
//         .then(dst => getDistance(src.latitude, src.longitude, dst.latitude, dst.longitude)));
//
//     var ticket;
//     var price;
//
//     distance.then(distance => {
//         price = getPrice(distance)
//             .then(price => ticket = createTicket({sourceStation: src._id, destinationStation: dst._id,
//                 distance: distance, price: price}))
//             .then(ticket => createTransaction({customer: customerId, ticket: ticket._id}))
//     })
// };

// Price CRUD
createPriceTiers = priceTiers => priceTiersModel.create(priceTiers);
deletePriceTiers = priceTiersId => transactionModel.deleteOne({_id: priceTiersId});
updatePriceTiers = (priceTiersId, priceTiers) => ({_id: priceTiersId}, {$set: priceTiers});
findPriceDistance = () => priceDistance.find();

createPriceDistance = (distancePrice) => priceDistance.create(distancePrice);
findAllPriceTiers = () => priceTiersModel.find();

//TODO de-couple station data fetching from database insertions
//We excluded Lechmere
var listOfStops = [];
fetchData = () => {
    return fetch("https://api-v3.mbta.com/stops?fields[stop]=name%2Clatitude%2Clongitude&filter[route_type]=0,1")
        .then(response => {
            response.json()
                .then(MBTA => {
                    //console.log(MBTA.data);
                    MBTA.data.map(records => {
                        // Duplicate station handling....
                        if (!(listOfStops.includes(records.attributes.name))) {
                            createStation({
                                _id: records.id,
                                name: records.attributes.name,
                                latitude: records.attributes.latitude,
                                longitude: records.attributes.longitude
                            })
                                .then(listOfStops.push(records.attributes.name))
                        }
                    })
                })
        })
};


populateDatabase = () => Promise.all(
    [
        createPerson({
            username: 'admin',
            password: 'admin',
            firstName: 'admin',
            lastName: 'admin',
            email: 'admin@admin.com',
            phoneNumber: 8576999999,
            userType: 'Admin'
        }),
        createPerson({
            username: 'alice',
            password: 'alice',
            firstName: 'Alice',
            lastName: 'Wonder',
            email: 'alice@wonder.com',
            phoneNumber: 8579999999,
            userType: 'Manager'
        }),
        createPerson({
            username: 'bob',
            password: 'bob',
            firstName: 'Bob',
            lastName: 'Marley',
            email: 'bob@marley.com',
            phoneNumber: 2125557777,
            userType: 'Agent'
        }),
        createPerson({
            username: 'charlie',
            password: 'charlie',
            firstName: 'Charles',
            lastName: 'Garcia',
            email: 'chuch@garcia.com',
            phoneNumber: 8571223456,
            userType: 'Customer'
        }),
        createPerson({
            username: 'dan',
            password: 'dan',
            firstName: 'Dan',
            lastName: 'Martin',
            email: 'dan@martin.com',
            phoneNumber: 7189098657,
            userType: 'Info_point',
        }),

        createPerson({
            username: 'ed',
            password: 'ed',
            firstName: 'Ed',
            lastName: 'Karaz',
            email: 'ed@kar.com',
            phoneNumber: 7185556565,
            userType: 'Customer',
        }),

        createPriceTiers({
            tier1: 1,
            tier2: 2,
            tier3: 3,
            tier4: 4,
            threshold1: 0.010,
            threshold2: 0.030,
            threshold3: 0.035,
            threshold4: 0.040
        }),

        createPriceDistance({
            distance: 0.01,
            price: 1
        }),
        createPriceDistance({
            distance: 0.02,
            price: 2
        }),
        createPriceDistance({
            distance: 0.03,
            price: 3
        }),
        createPriceDistance({
            distance: 0.04,
            price: 4
        })

    ]);

addRelationships = () => Promise.all(
    [
        createTransactionWithUsername('ed', 'Chinatown', 'Kenmore'),
        createTransactionWithUsername('ed', 'Park Street', 'Wonderland'),
        createTransactionWithUsername('ed', 'North Station', 'Riverside') //Lechmere doesnt exist.
    ]
);

truncateDatabase = () => Promise.all(
    [
        ticketModel.deleteMany({}),
        transactionModel.deleteMany({}),
        stationModel.deleteMany({}),
        priceTiersModel.deleteMany({}),
        personModel.deleteMany({}),
        priceDistance.deleteMany({})
    ]);

// Calculates Euclidean distance between two points
getDistance = (sourceLat, sourceLong, destLat, destLong) => {
    var a = Math.abs(destLat - sourceLat);
    var b = Math.abs(destLong - sourceLong);
    return Math.sqrt((a * a) + (b * b));
};

getPrice = (distance) => {
    var price = 0;
    var pricingTiers = findAllPriceTiers();
    return pricingTiers.then(pricingTiers => {

        if (distance > pricingTiers[0].threshold1) {
            price = pricingTiers[0].tier1;
        }
        if (distance > pricingTiers[0].threshold2) {
            price = pricingTiers[0].tier2;
        }
        if (distance > pricingTiers[0].threshold3) {
            price = pricingTiers[0].tier3;
        }
        if (distance > pricingTiers[0].threshold4) {
            price = pricingTiers[0].tier4;
        }
        return price;
    });
};


module.exports = {
    createStation,
    createPriceDistance,
    updateStation,
    deleteStation,
    findAllStations,
    findStationById,
    findStationByName,
    createPerson,
    updatePerson,
    deletePerson,
    findAllPersons,
    findPersonById,
    getPersonByUsername,
    createTicket,
    updateTicket,
    deleteTicket,
    findAllTickets,
    findTicketById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    createTransactionForTicket,
    findAllTransactions,
    findTransactionById,
    findTransactionsByUsername,
    populateDatabase,
    truncateDatabase,
    fetchData,
    getDistance,
    getPrice,
    findAllPriceTiers,
    generateTransaction,
    createTransactionWithUsername,
    findTransactionByUserNamePromise,
    getUserByUserType,
    addRelationships,
    findPriceDistance,
    updateTicketByUser
}