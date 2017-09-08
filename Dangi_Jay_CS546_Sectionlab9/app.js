const express = require("express");

const bodyParser = require("body-parser");
const connectFlash = require('connect-flash');
const expressSession = require('express-session');
const passport = require('passport');
const configRoutes = require("./routes");
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const cookieParser = require('cookie-parser');
const Strategy = require('passport-local').Strategy;
const datab = require("./data/users.js");

const app = express();
const static = express.static(__dirname + '/public');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(connectFlash());
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
};
app.use(rewriteUnsupportedBrowserMethods);

app.use("/public", static);
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use(expressSession({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false
	}
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy(
    (username, password, done) => {
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        let res = datab.findUserName(username, password);
        if(res.result) {
            console.log("true");
            return done(null, res.message);
        }
        return done(null, false, {message: res.message});
}));
  

passport.serializeUser((user, done) => {
    console.log(`serializing user: ${user}`);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log(`deserializing user: ${user}`);
    let token = user.split(' ');
    if (token.length != 2) {
        return done(null, false, {message: "Cookie is invalide."});
    }
    let username = token[0];
    let password = token[1];
    let rs = datab.findUserName(username, password);
    if(rs.result) {
        return done(null, rs.message);
    }
    return done(null, false, {message: rs.message});
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});