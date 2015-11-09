'use strict';

var _ = require('lodash');
var should = require('should');
var app = require('../../app');
var request = require('supertest');

var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost/kpos-test',
    users;

describe('GET /api/login', function() {


  before(function(done) {

    MongoClient.connect(url, {}, function(err, db) {
      // Get the documents collection
      var collection = db.collection('users');

      users = _.map([1, 2, 3, 4, 5], function(i){
        return {_id: i, dni: i+'123', firstName: 'nameuser'+i, lastName: 'lastnameuser'+i,
                  email: i+'ab@ioet.com', userName: 'user' + i, password: 'pass'+i,  sessionId: i*100};
      });
      collection.insert(users, function(err, result) {
        console.log('populando DB users');
        db.close();
        done();
      });
    });
  });

  after(function(done){
    MongoClient.connect(url, {}, function(err, db) {
      var users = db.collection('users');
      users.drop(function(){
        console.log('destroying DB users');
        db.close();
        done();
      });
    });
  });
  it('should login when username and password are correclty provided', function(done) {
    request(app)
      .post('/api/login')
      .send({userName: "user1", password: "pass1"})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
          res.body.result.should.be.instanceof(Object);
          res.body.result.userName.should.equal("user1");
          done();
        });
  });

  it('should logout when session_id exist', function(done) {
    request(app)
      .post('/api/login/logOut')
      .send({sessionId: 200})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
          res.body.flag.should.be.instanceof(Object);
          res.body.flag.should.equal(true);
          done();
        });
  });

  it('should logout when session_id no exist', function(done) {
    request(app)
      .post('/api/login/logOut')
      .send({sessionId: 100})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
          res.body.flag.should.be.instanceof(Object);
          res.body.flag.should.equal(false);
          done();
        });
  });
});
