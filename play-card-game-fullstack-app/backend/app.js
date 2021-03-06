var express = require('express');
var app = express();

var expressValidation = require('express-validation');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var compression = require('compression');

var Config = require('./config');
require('./constants');
var Utils = require('./utils');
var router = require('./routes');

var ENV = new Config();

console.log('NODE_ENV ', process.env.NODE_ENV);

var server = app.listen(ENV.APP_PORT || 8081, function () {
    var port = server.address().port;
    console.log('PORT ', port);
});

/*
    Enables compression
*/
app.use(compression({
    threshold: 0,
    filter: function () {
        return true;
    }
}));

app.use(bodyParser.json({
    limit: '20mb'
}));
app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: true
}));

app.use(cors());

/*
    Initialise connection to MongoDB
*/
mongoose.connect(ENV.MONGO_URI, function (err) {
    if (err) {
        console.log('DB connection failed', err);
        res.json(Utils.sendResponse(false, 500, err, 'Failed to connect db'));
    } else {
        console.log('Connected to mongodb');
    }
}, {
    useNewUrlParser: true
});

app.use('/api', router);

// middleware to handle error of request payload and invalid api
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        res.json(Utils.sendResponse(false, err.status, err.errors, err.statusText));
    } else {
        // If request body is okay and still getting the error, then comment below line & debug
        res.json(Utils.sendResponse(false, 500, err, 'Bad request'));
    }
});