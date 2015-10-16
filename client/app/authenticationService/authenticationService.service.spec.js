'use strict';

describe('Service: authenticationService', function () {

  // load the service's module
  beforeEach(module('kposApp'));

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
    $httpBackend.expectPOST('api/users/logged', {userName:'cris', password:'guncay'}).respond({result: {nombre: ''}});
    authenticationService.logIn('cris','guncay').then(function (data){
      expect(data).toEqual(true);
    });
    $httpBackend.flush();
    authenticationService.logOut();
  });

  it('#logIn evaluates if the credentials are incorrect', function() {
    $httpBackend.expectPOST('api/users/logged', {userName:'cris', password:'guncay'}).respond({result: undefined});
    authenticationService.logIn('cris','guncay').then(function (data){
      expect(data).toEqual(false);
    });
    $httpBackend.flush();
    authenticationService.logOut();
  });

  it('#checkStatus evaluates the state user', function() {
    authenticationService.checkStatus();
    expect(authenticationService.getCookie()).toBeUndefined();
  });
});
