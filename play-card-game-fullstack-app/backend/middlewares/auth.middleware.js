module.exports = (req, res, next) => {
    var jwt = require('jsonwebtoken');
    var Config = require('../config');
    var ENV = new Config();
    var Utils = require('../utils');
    var token = req.body.token || req.query.token || req.headers['Authorization'] || req.headers['token'];
    if (token) {
        // verifies secret and checks token
        jwt.verify(token, ENV.AUTHORIZATION_KEY, function (err, decoded) {
            if (err) {
                res.json(Utils.sendResponse(false, 401, [], 'Failed to authenticate token'));
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        res.json(Utils.sendResponse(false, 201, [], 'No token provided'));
    }
};