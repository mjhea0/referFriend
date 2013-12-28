var should = require("should");
var mongoose = require('mongoose');
var User = require("../models/users.js");

describe('Users', function() {

  before(function(done) {
    mongoose.connection.close()
    mongoose.connect('mongodb://localhost/test');
      done();
   });

  after(function(done) {
    mongoose.connection.close()
    done();
  });

  beforeEach(function(done) {
  var user = new User({
    name: '12345',
    email: '12345@testy.com'
  });

  user.save(function(error) {
    if (error) console.log('error' + error.message);
    else console.log('no error');
    done();
   });
  });

  it('find a user by name', function(done) {
    User.findOne({ name: '12345' }, function(err, user) {
      user.name.should.eql('12345');
      console.log("   name: ", user.name)
      done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
  });

});
