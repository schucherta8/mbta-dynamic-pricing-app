require('dotenv').config();

module.exports = function () {
    const mongoose = require('mongoose');
    const uri  = process.env.ATLAS_URI;
    console.log(uri);
    mongoose.connect(uri, {useNewUrlParser: true,
        useUnifiedTopology: true});
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());


    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin",
            "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });


    const mbtaController = require('./controller/mbtaController');

    mbtaController(app);

    app.listen(4000, () => {console.log("Server running")});

};