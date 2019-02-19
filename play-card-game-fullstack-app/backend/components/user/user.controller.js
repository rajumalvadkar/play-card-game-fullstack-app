var Utils = require('../../utils');
var UserModel = require('./user.model');

var UserCtrl = {

    // Get user details
    getUserDetails: (reqBody, res) => {
        const objFilter = {};
        if (reqBody.id) {
            objFilter['_id'] = reqBody.id;
        }
        UserModel
            .findOne(objFilter)
            .sort({
                updated_at: 'desc'
            })
            .exec((err, userDetails) => {
                if (err) {
                    res.json(Utils.sendResponse(false, 201, reqBody, err.message));
                } else {
                    res.json(Utils.sendResponse(true, 200, {
                        userDetails: userDetails
                    }, ''));
                }
            });
    },

    // Update user
    updateUser: (reqBody, res) => {
        var query = {
            _id: reqBody._id
        };

        UserModel.findOneAndUpdate(query, reqBody, (err, result) => {
            if (err) {
                res.json(Utils.sendResponse(false, 201, err, ''));
            } else {
                res.json(Utils.sendResponse(true, 200, {}, ''));
            }
        });
    }

};

module.exports = UserCtrl;