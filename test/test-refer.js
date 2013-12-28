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








  // describe('POST /articles', function () {
  //   context('When not logged in', function () {
  //     it('should redirect to /login', function (done) {
  //       request(app)
  //       .get('/articles/new')
  //       .expect('Content-Type', /plain/)
  //       .expect(302)
  //       .expect('Location', '/login')
  //       .expect(/Moved Temporarily/)
  //       .end(done)
  //     })
  //   })

  //   context('When logged in', function () {
  //     before(function (done) {
  //       // login the user
  //       agent
  //       .post('/users/session')
  //       .field('email', 'foobar@example.com')
  //       .field('password', 'foobar')
  //       .end(done)
  //     })

  //     describe('Invalid parameters', function () {
  //       before(function (done) {
  //         Article.count(function (err, cnt) {
  //           count = cnt
  //           done()
  //         })
  //       })

  //       it('should respond with error', function (done) {
  //         agent
  //         .post('/articles')
  //         .field('title', '')
  //         .field('body', 'foo')
  //         .expect('Content-Type', /html/)
  //         .expect(200)
  //         .expect(/Article title cannot be blank/)
  //         .end(done)
  //       })

  //       it('should not save to the database', function (done) {
  //         Article.count(function (err, cnt) {
  //           count.should.equal(cnt)
  //           done()
  //         })
  //       })
  //     })

  //     describe('Valid parameters', function () {
  //       before(function (done) {
  //         Article.count(function (err, cnt) {
  //           count = cnt
  //           done()
  //         })
  //       })

  //       it('should redirect to the new article page', function (done) {
  //         agent
  //         .post('/articles')
  //         .field('title', 'foo')
  //         .field('body', 'bar')
  //         .expect('Content-Type', /plain/)
  //         .expect('Location', /\/articles\//)
  //         .expect(302)
  //         .expect(/Moved Temporarily/)
  //         .end(done)
  //       })

  //       it('should insert a record to the database', function (done) {
  //         Article.count(function (err, cnt) {
  //           cnt.should.equal(count + 1)
  //           done()
  //         })
  //       })

  //       it('should save the article to the database', function (done) {
  //         Article
  //         .findOne({ title: 'foo'})
  //         .populate('user')
  //         .exec(function (err, article) {
  //           should.not.exist(err)
  //           article.should.be.an.instanceOf(Article)
  //           article.title.should.equal('foo')
  //           article.body.should.equal('bar')
  //           article.user.email.should.equal('foobar@example.com')
  //           article.user.name.should.equal('Foo bar')
  //           done()
  //         })
  //       })
  //     })
  //   })
  // })
