// dependencies
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var user = require('./models/users.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

console.log(process.env.NODE_ENV)


if (!process.env.NODE_ENV) {
  var config = require('./config-dev.js');
} else if (process.env.NODE_ENV == "production") {
  var config = require('./config-pro.js');
};

// connect to mongo
mongoose.connect(process.env.MONGOLAB_URI || config.mongoUrl);

// passport settings
passport.serializeUser(function(user,done)
{
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	user.findOne({_id : id}, function(err, user){
		done(err,user);
	});
});

passport.use(new GoogleStrategy({
  returnURL: config.google.returnURL,
  realm: config.google.realm
},
  function(identifier, profile, done) {
    console.log(profile.emails[0].value)
		process.nextTick(function() {
			var query = user.findOne({'email': profile.emails[0].value});
			query.exec(function(err, oldUser){
				
				if(oldUser)
				{
					console.log("Found registered user: " + oldUser.name + " is logged in!");
					done(null, oldUser);
				} else {
					var newUser = new user();
					newUser.name = profile.displayName;
					newUser.email = profile.emails[0].value;
					console.log(newUser);
					newUser.save(function(err){
						if(err){
							throw err;
						}
						console.log("New user, " + newUser.name + ", was created");
						done(null, newUser);
					});
				}
			});
		});
	}
));

// config - all environments
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret:'c00kies-@nd-cr3@M'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

// config - development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// auth routes
app.get('/auth/google', 
  passport.authenticate('google', {scope:'email'}),
  function(req, res){
});
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
});

// user routes
app.get('/', routes.index);
app.get('/account', ensureAuthenticated, routes.account);
app.get('/logout', function(req, res){
	req.logOut();
	res.redirect('/');
});
app.post('/account', ensureAuthenticated, routes.accountPost);
app.use(function(req, res, next){
  res.status(404);
  if (req.accepts('jade')) {
    res.render('404', { url: req.url });
    return;
  }
});

// authentication helper
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

// run server
http.createServer(app).listen(app.get('port'), function(){
  console.log('\nListening on port ' + app.get('port'));
});

module.exports = app;

