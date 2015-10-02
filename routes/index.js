var express = require('express');
var passport = require('passport');
var User = require('../models/users');
var router = express.Router();
var settings = require('../settings/settings');

var reports = require('../settings/reports');
var PostGresHelper = require("./postGresHelper.js");
var pghelper = new PostGresHelper();

router.get('/', function (req, res) {
    res.render('index', {
      user : req.user,
      opts: settings.siteConfig
    });
});

router.get('/register', function(req, res) {
    res.render('register', {
      opts: settings.siteConfig
    });
});

router.post('/register', function(req, res, next) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', function(req, res) {
    res.render('login', {
      user : req.user,
      opts: settings.siteConfig
    });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.get('/tables', function(req, res){
  pghelper.query(reports.list_all_tables, function(err, data){
    res.render('tables', {
      opts: settings.siteConfig,
      pgdata : data
    });
  });
});

module.exports = router;
