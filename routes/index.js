var refer = require('../models/refer.js');
var users = require('../models/users.js');

exports.index = function(req, res){
  res.render('index', { title: 'Refer-a-Friend'});
};

exports.account = function(req, res){
  res.render('account', { title: 'Referral System', username: req.user.name, email: req.user.email });
};

exports.accountPost = function(req, res) {
  var data = req.body;
  var newRefer = new refer();
  newRefer.name = data.name
  newRefer.email = data.email
  newRefer.createdDate = new Date();
  newRefer.refererEmail = data.refererEmail;

  newRefer.save(function(err){
    if(err) {
      throw err;
      res.send(err)
    } else {
      console.log("New referal, " + newRefer.name + ", was created");
      refer.find({ email: newRefer.email }, function(err, doc) {
        if (err) return console.error(err); 
        res.send(200,doc)
      });
    };
  });       
};
