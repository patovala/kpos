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

      // TODO: al hacer login se deberia actualizar en user UNICAMENTE el session_id del usuario
      users = _.map([1, 2, 3, 4, 5], function(i){
        return {_id: i, dni: i+'123', firstname: 'nameuser'+i, lastname: 'lastnameuser'+i,
                  email: i+'ab@ioet.com', userName: 'user' + i, password: 'pass'+i,  session_id: i * 100};
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

  // TODO: Este test deberia ser: should login when username and password are
  // correclty provided, cambiar mensaje y cambiar endpoint a /api/users/login.
  //
  // El login deberia crear una session y retornar ese id de session
  it('should login when username and password are correclty provided', function(done) {
    request(app)
      .post('/api/login')
      .send({userName: "user1", password: "pass1"})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
          res.body.result.should.be.instanceof(Object);
          res.body.result._id.should.equal(1);
          done();
        });
  });
});
