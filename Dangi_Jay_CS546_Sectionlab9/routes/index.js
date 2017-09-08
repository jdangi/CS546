const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const router = express.Router();
const datab = require("../data/users.js");

let configRoutes = (app) => {
  app.post('/login', 
    passport.authenticate('local', {
      successRedirect: '/private',
      failureRedirect: '/',
	    failureFlash: true,
	    successFlash: "Welcome"
    }));

 	app.get('/login', (req, res) => {
		if (!req.isAuthenticated()) {
			if (req.session.flash && req.session.flash.error) {
				console.log("error: " + req.session.flash.error.slice(-1)[0]);
				res.render('login.handlebars', {
					error: true,
					message: req.session.flash.error.slice(-1)[0]
				});
				return
			}
			res.render('login', {
				error: false
			});
		} else {
			res.redirect('/private');
		}
	});

  app.get("/private", (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
      console.log(req.user);
      let username = req.user.split(' ')[0];
      let userInfo = datab.getUserInfo(username);
      res.render('private.handlebars', {
        id : userInfo.id,
				username: username,
				firstName: userInfo.FirstName,
				lastName: userInfo.LastName,
				profession: userInfo.Profession,
				bio: userInfo.Bio
      });
    } else {
      console.log("Unanthenticated, return to login page");
      res.redirect('/login');
    }
  });

app.get("/", (req, res) => {
		if (req.isAuthenticated()) {
			res.redirect('/private');
		} else {
			res.redirect('/login');
		}
  });

	app.use("*", (req, res) => {
    res.sendStatus(404);
	});

}

module.exports = configRoutes;