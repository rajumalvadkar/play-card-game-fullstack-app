var express = require('express');
var router = express.Router();
var validate = require('express-validation');
var AuthValidation = require('./auth.validation');
var AuthCtrl = require('./auth.controller');

// Login user
router.post('/login', validate(AuthValidation.login), (req, res) => {
    AuthCtrl.login(req.body, res);
});

// Signup
router.post('/signup', (req, res) => {
    AuthCtrl.signup(req.body, res);
});

module.exports = router;