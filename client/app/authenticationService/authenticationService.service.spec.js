'use strict';

describe('Service: authenticationService', function () {

  // load the service's module
  beforeEach(module('kposApp'));
  beforeEach(module('app/main/partials/login.html'));
  beforeEach(module('app/main/main.html'));

  // instantiate service
  var authenticationService, $httpBackend;
  beforeEach(inject(function (_authenticationService_, _$httpBackend_) {
    authenticationService = _authenticationService_;
    $httpBackend = _$httpBackend_;

  }));

  afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
  });

  it('#logIn evaluates if the credentials are correct', function() {
    $httpBackend.expectPOST('api/login', {userName:'cris', password:'guncay'}).respond({result: {sessionId: 100, userName: 'cris'}});
    authenticationService.logIn('cris','guncay').then(function (data){
      expect(data).toEqual(true);
    });
    $httpBackend.flush();
  });

  it('#logIn evaluates if the credentials are incorrect', function() {
      $httpBackend.expectPOST('api/login', {userName:'cris', password:'guncay'}).respond({result: 'Not Found'});
      authenticationService.logIn('cris','guncay').then(function (data){
        expect(data).toEqual(false);
      });
      $httpBackend.flush();
  });

  it('#logOut evaluates when the user has been authenticated for closed session', function() {
      $httpBackend.expectPOST('api/login', {userName:'cris', password:'guncay'}).respond({result: {sessionId: 100, userName: 'cris'}});
      authenticationService.logIn('cris','guncay').then(function (data){
        expect(data).toEqual(true);
      });
      $httpBackend.expectPOST('api/login/logOut', {sessionId: 100}).respond({flag: true});
      authenticationService.logOut(100);
      $httpBackend.flush();
      authenticationService.checkStatus();
      expect(authenticationService.getCookie()).toBeUndefined();
  });

  it('#logOut evaluates when the user has not been authenticated for closed session', function() {
      $httpBackend.expectPOST('api/login/logOut', {sessionId: 200}).respond({flag: false});
      authenticationService.logOut(200);
      $httpBackend.flush();
  });

  it('#checkStatus evaluates the state user', function() {
      authenticationService.checkStatus();
      expect(authenticationService.getCookie()).toBeUndefined();
  });
});
