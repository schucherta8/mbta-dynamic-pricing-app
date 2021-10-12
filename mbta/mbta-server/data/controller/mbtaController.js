const mbtaDao = require('../daos/mbtaSystem.dao.server');

module.exports = function(app) {

    // USER CONTROLLER
    app.post('/api/profile', (req, res) => {
        const person = req.body;
        // person._id = req.body.id;
        // person.firstName = req.body.firstName;
        // person.lastName = req.body.lastName;
        // person.email = req.body.email;
        // person.phoneNumber = req.body.phone;
        // person.password = req.body.password;
        // person.username = req.body.username;
        console.log(person);
        mbtaDao.createPerson(person)
            .then(() => {
                return mbtaDao.findAllPersons()
            })
            .then(persons => res.json(persons))
    });

    app.put('/api/profile/update', (req, res) => {
        const person = req.body;
        // person._id = req.body.id;
        // person.firstName = req.body.firstName;
        // person.lastName = req.body.lastName;
        // person.email = req.body.email;
        // person.phoneNumber = req.body.phone;
        // person.password = req.body.password;
        // person.username = req.body.username;
        console.log(person);
        mbtaDao.updatePerson(person)
            .then(() => {
                return mbtaDao.findAllPersons()
            })
            .then(persons => res.json(persons))
    });



    // app.get('/api/profile', function (req, res) {
    //     mbtaDao.findAllPersons()
    //         .then(persons => {
    //             res.json(persons)
    //         })
    // });

    app.get('/api/getUsersByUserType/:userType', function (req, res) {
        const userType = req.params['userType'];
        mbtaDao.getUserByUserType(userType)
            .then(persons => {
                res.json(persons)
            })
    });

    app.get('/api/users/getUsers', function (req, res) {
        mbtaDao.findAllPersons()
            .then(persons => {
                res.json(persons)
            })
    });


    app.get('/api/users/:username', function (req, res) {
        const username = req.params['username'];
        // const password = req.params['password'];
        mbtaDao.getPersonByUsername(username)
            .then(person => {
                res.json(person)
            })
    });

    app.get('/api/priceDistance', function (req, res) {
        mbtaDao.findPriceDistance()
            .then(priceDistance => {
                res.json(priceDistance)
            })
    });


    // STATION CONTROLLER
    app.post('/api/createStation', (req,res) => {
        const station = req.body;
        mbtaDao.createStation(station)
            .then(stations => {
                return mbtaDao.findAllStations()
            })
            .then(stations => res.json(stations))
    });

  /*  app.post('/api/createTransaction', (req,res) => {
        const transaction = req.body;
        mbtaDao.createTransaction(transaction)
            .then(transactions => {
                return mbtaDao.findAllTransactions()
            })
            .then(transactions => res.json(transactions))
    });*/


    app.get('/api/stations', function (req, res) {
        mbtaDao.findAllStations()
            .then(stations => {
                res.json(stations)
            })
    });

    app.put('/api/stations/update', (req, res) => {
        const station = req.body;
        console.log(station);
        mbtaDao.updateStation(station)
            .then(() => {
                return mbtaDao.findAllStations()
            })
            .then(stations => {
                console.log("Cleveland Circle ID: " + stations[0]._id)
                console.log("CC Lat" + stations[0].latitude)
                console.log("CC Long" + stations[0].longitude)
                res.json(stations)
            })
    });

    app.put('/api/user/update', (req, res) => {
        const user = req.body;
        mbtaDao.updatePerson(user)
            .then(() => {
                return mbtaDao.findAllPersons()
            })
            .then(users => {
                res.json(users)
            })
    });

    app.put('/api/ticket/update', (req, res) => {
        const ticket = req.body;
        const sourceStation = req.body.sourceStation;
        const destinationStation = req.body.destinationStation;

        let source =  mbtaDao.findStationByName(sourceStation);
        let destination = source.then(function() {
            return mbtaDao.findStationByName(destinationStation);
        });
        return Promise.all([source, destination]).then(function([source, destination]) {
            ticket.sourceStation = source._id;
            ticket.destinationStation = destination._id;
            mbtaDao.updateTicketByUser(ticket)
                .then(() => {
                    return mbtaDao.findAllTickets()
                })
                .then(tickets => {
                    res.json(tickets)
                })
        })
    });

    app.put('/api/transaction/update', (req, res) => {
        const transaction = req.body;
        mbtaDao.updateTransaction(transaction)
            .then(() => {
                return mbtaDao.findAllTransactions()
            })
            .then(transactions => {
                res.json(transactions)
            })
    });

    app.get('/api/stationsInfo/:stationName', function (req, res) {
        const stationName = req.params['stationName'];
        console.log(stationName);
        mbtaDao.findStationByName(stationName)
            .then(station => {
                res.json(station);
                console.log("ID: " + station._id);
                console.log("Lat: " + station.latitude);
                console.log("Long: " + station.longitude);
            })
    });


    app.get('/api/stations/:stationId', function (req, res) {
        const stationId = req.params['stationId']
        console.log(stationId)
        mbtaDao.findStationById(stationId)
            .then(station => {
                res.json(station)
                console.log("ID: " + station._id);
                console.log("Lat: " + station.latitude);
                console.log("Long: " + station.longitude);
            })
    });


    app.get('/api/ticket/:ticketId', function (req, res) {
        const ticketId = req.params['ticketId']
        console.log(ticketId)
        mbtaDao.findTicketById(ticketId)
            .then(ticket => {
                res.json(ticket)
            })
    });

    app.get('/api/ticket', function (req, res) {
        mbtaDao.findAllTickets()
            .then(tickets => {
                res.json(tickets)
            })
    });


    // createTransactionForTicket

    // app.post('/api/createTransaction', (req, res) => {
    //     // const searchBody = req.body;
    //     // console.log("-------------");
    //
    //     //const customerId = '5de9a43a89df0729f02a4d2f';
    //     const username = req.body.username;
    //     const sourceStation = req.body.sourceStation;
    //     const destinationStation = req.body.destinationStation;
    //     // console.log(username);
    //     // console.log(sourceStation);
    //     // console.log(destinationStation);
    //     mbtaDao.getPersonDetails(username)
    //         .then((res) => { return mbtaDao.createTransactionForTicket(res._id, sourceStation, destinationStation) })
    //         .then(() =>
    //             mbtaDao.findAllTransactions()
    //         )
    //         .then(transactions => {
    //             res.json(transactions)
    //         })
    // });


    app.post('/api/createTransaction', (req, res) => {
        console.log("/api/createTransaction");
        const username = req.body.username;
        const sourceStation = req.body.sourceStation;
        console.log(mbtaDao.findStationByName(sourceStation));
        // if (mbtaDao.findStationByName(sourceStation) === ) {
        
        // }
        const destinationStation = req.body.destinationStation;
        let transaction =  mbtaDao.getPersonByUsername(username)
            .then((res) => { return mbtaDao.createTransactionForTicket(res._id, sourceStation, destinationStation) });

        return Promise.all([transaction]).then(function() {
            mbtaDao.findAllTransactions()
                .then(tickets => {
                    res.json(tickets)
                })
        })
    });

    app.post('/api/profile', (req, res) => {
        const person = req.body;
        console.log(person);
        mbtaDao.createPerson(person)
            .then(() => {
                return mbtaDao.findAllPersons()
            })
            .then(persons => res.json(persons))
    });


    app.get('/api/transactions/getTransactions', function (req, res) {
        var temp;
        temp = mbtaDao.findAllTransactions();
            temp.then(transactions => {
                res.json(transactions)
            })
    });


    // end point to get transaction for a given username
    app.get('/api/transactions/:username', function (req, res) {
        const username = req.params['username'];
        console.log(username);
        mbtaDao.findTransactionsByUsername(username)
            .then(transaction => {
                res.json(transaction)
            })
    });


    app.delete('/api/deleteUser/:username', function (req, res) {
        const username = req.params['username'];
        console.log(username);
        mbtaDao.deletePerson(username)
            .then(response => {
                res.json(response)
            })
    });

    app.delete('/api/deleteStation/:stationid', function (req, res) {
        const stationid = req.params['stationid'];
        console.log(stationid);
        mbtaDao.deleteStation(stationid)
            .then(response => {
                res.json(response)
            })
    });


    app.delete('/api/cascadeDeleteTransaction/:transactionid', function (req, res) {
        const transactionid = req.params['transactionid'];
        console.log(transactionid);
        mbtaDao.findTransactionById(transactionid)
            .then(transaction => {
                return mbtaDao.deleteTicket(transaction.ticket) })
            .then(() =>  mbtaDao.deleteTransaction(transactionid))
            .then(response => {
                res.json(response)
            })
    });

    app.delete('/api/deleteTicket/:ticketid', function (req, res) {
        const ticketid = req.params['ticketid'];
        console.log(ticketid);
        mbtaDao.deleteTicket(ticketid)
            .then(response => {
                res.json(response)
            })
    });

};