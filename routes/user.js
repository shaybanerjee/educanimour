var express = require('express');
var router = express.Router();
var Product = require('./../models/product');
var csrf = require('csurf'); 
var csrfProtection = csrf(); 
router.use(csrfProtection);
var passport = require('passport');

var csrfProtection = csrf(); 
router.use(csrfProtection);

router.get('/profile', isUserLoggedIn, function(req, res, next) {
  res.render('users/profile');
});

router.get('/logout', isUserLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', isUserNotLoggedIn, function(req, res, next) {
    next();
});

router.get('/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('users/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect:'/users/profile',
  failureRedirect:'/users/signup',
  failureFlash:true

}));


router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('users/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});


router.post('/signin', passport.authenticate('local.signin', {
  successRedirect:'/users/profile',
  failureRedirect:'/users/signin',
  failureFlash:true

}));


module.exports = router;

function isUserLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next(); 
    }
    res.redirect('/');
}

function isUserNotLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next(); 
    }
    res.redirect('/');
}