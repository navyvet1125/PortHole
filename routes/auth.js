var express = require('express');
var router = express.Router();
var passport   = require('passport');
var authController = require('../controllers/auth_controller');

require('../config/passport')(passport);

router.route('/facebook')
	.get(passport.authenticate('facebook', {scope: 'email', failureRedirect: '/auth/error/facebook'}));

router.route('/facebook/callback')
	.get(passport.authenticate('facebook', {failureRedirect: '/auth/error/facebook'}), authController.auth);
router.route('/google')
	.get(passport.authenticate('google', {scope: 'email', failureRedirect: '/auth/error'}));

router.route('/google/callback')
	.get(passport.authenticate('google', {failureRedirect: '/auth/error'}), authController.auth);

router.route('/error')
  .get(authController.error);

module.exports = router;
