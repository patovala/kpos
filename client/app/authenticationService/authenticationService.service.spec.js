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

  it('#logIn evaluates if the credentials are incorrect', function() {
    $httpBackend.expectPOST('api/authentication/logged', {user:'cris', password:'guncay'}).respond({result:'error'});
    authenticationService.logIn('cris', 'guncay');
    $httpBackend.flush();
    expect(authenticationService.getMsg()).toEqual('Credenciales inválidas');
  });

  it('#logIn evaluates the value of id the user', function() {
    $httpBackend.expectPOST('api/authentication/logged', {user:'cris', password:'guncay'}).respond({logid:'0105220347'});
    authenticationService.logIn('cris', 'guncay');
    $httpBackend.flush();
    expect(authenticationService.getLogId()).toEqual('0105220347');
  });

  it('#checkStatus evaluates the state user', function() {
    authenticationService.checkStatus();
    expect(authenticationService.getLogId()).toBeUndefined();
  });

});
