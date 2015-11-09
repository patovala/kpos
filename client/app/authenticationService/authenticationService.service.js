'use strict';

angular.module('kposApp')
  .service('authenticationService', function ($resource, $cookies, $location, $q) {
    var access = false;

    return {
      logIn: logIn,
      logOut: logOut,
      checkStatus: checkStatus,
      getCookie:getCookie
    };

    function logIn(user, password){
      var deferred = $q.defer();
      var r = $resource('api/login');
      r.save({userName: user, password: password}, function(data){
        if(data && data.result.sessionId){
          $cookies.putObject('user', data.result);
          deferred.resolve(true);
        }else{
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    }

    function logOut(sessionId){
      var r = $resource('api/login/logOut');
      r.save({sessionId: sessionId}, function(data){
        if(data && data.flag === true){
          $cookies.remove('user');
          $location.path('/');
        }else{
            alertify.error('Error logout session');
        }
      });
    }

    function checkStatus(){
      access = false;
      if($cookies.getObject('user') === undefined){
        access = false;
      }else{
        access = true;
      }
      return access;
    }

    function getCookie(){
      return $cookies.getObject('user');
    }
});
