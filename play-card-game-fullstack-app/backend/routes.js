var express = require('express');
var router = express.Router();
// Routes for the component/module
var authRouter = require('./components/auth/auth.route');
var userRouter = require('./components/user/user.route');
// Auth middleware
var authMW = require('./middlewares/auth.middleware.js');
var Config = require('./config');
var ENV = new Config();

// Unauthorized/unprotected route e.g login, forgot pwd api etc.

// Unprotected routes starts here
router.use('/', authRouter);
// Unprotected routes ends here

// Middleware which will authendicate token
router.use(authMW);

// Protected routes starts here
router.use('/user', userRouter);
// Protected routes ends here

module.exports = router;