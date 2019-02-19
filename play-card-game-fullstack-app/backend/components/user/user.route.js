var express = require('express');
var router = express.Router();
var UserCtrl = require('./user.controller');

// Get user details by using id (user id)
router.get('/:id', function (req, res) {
    UserCtrl.getUserDetails(req.params, res);
});

// Update user
router.put('', function (req, res) {
    UserCtrl.updateUser(req.body, res);
});

module.exports = router;