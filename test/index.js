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

  describe('when requesting resource /accounts when not logged in', function(){
    it('should respond with 302 - redirect', function(done){
      request(app)
      .get('/account')
      .expect(302)
      .expect('Location', '/')
      .end(done);
    })
  }); 

  describe('when requesting resource /accounts when logged in', function(){
    it('should respond with 200 - OK', function(done){
      request(app)
      .get('/account')
      .expect(302, done);
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
