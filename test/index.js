'use strict';

var app = require('../app');
var request = require('supertest');

describe('referFriend', function(){

  describe('when requesting resource /', function(){
    it('should respond with 200', function(done){
      request(app)
      .get('/')
      .expect(200, done);
    })
  });

  describe('when requesting resource /accounts', function(){
    it('should respond with 302 - redirect', function(done){
      request(app)
      .get('/account')
      .expect(302, done);
    })
  });

  describe('when posting to /account', function(){
    it('should respond with 200', function(done){
      request(app)
      .post('/account')
      .send({ name: "Mike", email: "user@gluck.com", createdDate:new Date(), refererEmail: "test@tester123.com" })
      .expect(302, done)        
    })
  }); 

  describe('when requesting resource /missing', function(){
    it('should respond with 404', function(done){
      request(app)
      .get('/missing')
      .expect(404, done);
    })
  });

});
