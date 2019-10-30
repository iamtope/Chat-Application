// variable declarations
var passport = require('passport');
var facebook = require('passport-facebook').Strategy;
var google = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config')
var local = require('passport-local').Strategy
var passwordUtils = require('./password')
var user = require('./user')

passport.use(new facebook ({
    clientID : config.facebook.appID,
    clientSecret : config.facebook.appSecret,
    callbackURL: config.routes.facebookAuthCallback
},
function(accessToken, refreshToken, profile, done){
  done(null, profile);
}));
//middleware for the google passport.use
passport.use(new google({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.routes.googleAuthCallback
},
function(accessToken, refreshToken, profile, done) {
  done(null, profile);
}));
passport.serializeUser(function(user, done){
    done(null, user);
});
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });

//  The routes function will need a reference to Express, so it is passed in as a parameter.
var routes = function routes(app){
    app.get(config.routes.facebookAuth, passport.authenticate('facebook'));
    app.get(config.routes.facebookAuthCallback, passport.authenticate('facebook',
    {successRedirect: config.routes.chat,
     failureRedirect: config.
     routes.login, failureFlash: true}));
  // for google
  // the only differrence between google and facebook oauth is that google desires its user scope to be explicitly defined
    app.get(config.routes.googleAuth, passport.authenticate('google',
    { scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'] }));
    app.get(config.routes.googleAuthCallback, passport.
    authenticate('google',
    {successRedirect: config.routes.chat, failureRedirect: config.
    routes.login, failureFlash: true}));

    // routes function for local authentication
    app.post(config.routes.login, passport.authenticate('local',
    {successRedirect: '/chat', failureRedirect: config.routes.login,
    failureFlash: true}));
};
passport.use(new local(function(username, password, done){
	user.findByUsername(username, function(err, profile){
		if(profile)
		{
			passwordUtils.passwordCheck(password, profile.password, profile.salt, profile.work, function(err,isAuth){
				if(isAuth)
				{
					if (profile.work < config.crypto.workFactor)
					{
						user.updatePassword(username, password, config.crypto.workFactor);
					}
					done(null, profile);
				}
				else
				{
					log.debug({message: 'Wrong Username or Password', username: username});
					done(null, false, {message: 'Wrong Username or Password'});
				}
			});
		}
		else
		{
			done(null, false, {message: 'Wrong Username or Password'});
		}
	});
}));

exports.passport = passport;
exports.routes = routes;