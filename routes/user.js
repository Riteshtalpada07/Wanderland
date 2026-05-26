const express = require('express'); 
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');

const userController = require('../controllers/user.js');
const user = require('../models/user');

//signup route to create a new user account and log in the user using passport local strategy
router.route('/signup').get( userController.renderSignupForm)
                       .post(wrapAsync(userController.signup));

//login route to authenticate user and log in the user using passport local strategy
router.route('/login').get(userController.renderLoginForm)
                      .post(saveRedirectUrl, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), userController.login);  


//logout route to log out the user and redirect to listings page
router.get('/logout', userController.logout );

module.exports = router;