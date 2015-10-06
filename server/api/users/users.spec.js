'use strict';

var _ = require('lodash');
var should = require('should');
var app = require('../../app');
var request = require('supertest');

var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost/kpos-test',
    users;

describe('GET /api/users', function() {


  before(function(done) {

    MongoClient.connect(url, {}, function(err, db) {
      // Get the documents collection
      var collection = db.collection('users');
      // Insert some documents
      users = _.map([1, 2, 3, 4, 5], function(i){
        return {_id: i, dni: i+'123', firstname: 'nameuser'+i, lastname: 'lastnameuser'+i,
                  username: 'user' + i, password: 'pass'+i,  session_id: i * 100};
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


  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(5);
        done();
      });
  });

  it('should get the user by username and password', function(done) {
    request(app)
      .get('/api/users/logged?username=user1&password=pass1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body._id.should.equal(1);
          done();
        });
  });

  it('should add user with the correct information', function(done) {
    request(app)
      .post('/api/users/add')
      .send({user: {_id: 25, dni: 1234, firstname: 'Jimmy', lastname: 'Jaramillo',
                    username: "jim", password: "jj", session_id: 1234}})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
          res.body.ops.should.be.instanceof(Array);
          res.body.ops.length.should.equal(1);
          res.body.ops[0]._id.should.equal(25);
          res.body.ops[0].username.should.equal("jim");
          res.body.ops[0].password.should.equal("jj");
          done();
      });
  });

  it('should update user by username', function(done) {
    request(app)
      .post('/api/users/update')
      .send({user: {_id: 1, dni:101010, firstname: 'nameuser101010', lastname: 'lastnameuser101010',
            username: "user101010", password: "101010", session_id: 101010}})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
          res.body.ok.should.equal(1);
          done();
      });
  });

  it('should delete the user by id', function(done) {
    request(app)
      .get('/api/users/delete?_id=25')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
          res.body.ok.should.equal(1);
          done();
        });
  });

});
