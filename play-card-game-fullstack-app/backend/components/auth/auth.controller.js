var Utils = require('../../utils');
var Config = require('../../config');
var ENV = new Config();
var jwt = require('jsonwebtoken');
var UserModel = require('../user/user.model');
var AuthCtrl = {
    login: (reqBody, res) => {
        UserModel.findOne(reqBody, (err, userDetails) => {
            try {
                if (err) {
                    res.json(Utils.sendResponse(false, 500, [], err.message));
                } else if (userDetails) {
                    var token = jwt.sign(reqBody, ENV.AUTHORIZATION_KEY, {
                        expiresIn: '1d'
                    }, (err, token) => {
                        if (err || !token) {
                            res.json(Utils.sendResponse(false, 500, err, 'Failed to create token'));
                        } else if (token) {
                            const userData = Object.assign({}, userDetails._doc);
                            userData.token = token;
                            res.json(Utils.sendResponse(true, 200, {
                                userData: userData
                            }, ''));
                        }
                    });
                } else {
                    res.json(Utils.sendResponse(false, 200, {}, 'Invalid email or password'));
                }
            } catch (e) {
                res.json(Utils.sendResponse(false, 500, e, e.message));
            }
        });
    },
    // Signup user
    signup: (reqBody, res) => {
        // Check user is already exist
        const objLoginBody = {
            login: reqBody.login
        };
        UserModel.findOne(objLoginBody, (err, userDetails) => {
            try {
                if (err) {
                    res.json(Utils.sendResponse(false, 500, [], err.message));
                } else if (userDetails) {
                    res.json(Utils.sendResponse(false, 400, err, 'User already exist'));
                } else {
                    let userModel = new UserModel(reqBody);
                    userModel.save((err, userData) => {
                        if (err) {
                            res.json(Utils.sendResponse(false, 200, err, 'Error while creating user'));
                        } else {
                            res.json(Utils.sendResponse(true, 200, userData, 'User created successfully'));
                        }
                    });
                }
            } catch (e) {
                res.json(Utils.sendResponse(false, 500, e, e.message));
            }
        });

    },
};

module.exports = AuthCtrl;