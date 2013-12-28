var should = require("should");
var mongoose = require('mongoose');
var Refer = require("../models/refer.js");

describe('Refer', function() {

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
  test = new Date();
  // create new referral
  var referral = new Refer({
    name: '54321',
    email: '54321@testy.com',
    createdDate: test,
    refererEmail: '876@678.com'
  });

  referral.save(function(error) {
    if (error) console.log('error' + error.message);
    else console.log('no error');
    done();
   });
  });

  it('find a referral by email', function(done) {
    Refer.findOne({ email: '54321@testy.com' }, function(err, referral) {
      referral.email.should.eql('54321@testy.com');
      console.log("   email: ", referral.email)
      done();
    });
  });

  afterEach(function(done) {
    Refer.remove({}, function() {
      done();
    });
  });

});
