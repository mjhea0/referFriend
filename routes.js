var passport = require('passport');
var Account = require('./models/account');
var Refer = require('./models/refer');

module.exports = function (app) {
    
  app.get('/', function (req, res) {
    res.render('index', { user : req.user });
  });

  app.get('/register', function(req, res) {
    res.render('register', { });
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
        return res.render("register", {info: "Sorry. That username already exists. Try again."});
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/refer');
      });
    });
  });

  app.get('/login', function(req, res) {
    res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/refer');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/ping', function(req, res){
    res.send("pong!", 200);
  });

  app.get('/refer', ensureAuthenticated, function(req, res) {
    res.render('refer', { user : req.user });
  });



  app.post('/generate', function(req, res){
    user = new Refer({name:req.body.name, email:req.body.email})
    user.save()
    res.render('/test',{name:req.body.name, email:req.body.email});
  });

  // test authentication
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
  }
  
};
