'use strict';

angular.module('kposApp')
  .service('authenticationService', function ($resource, $cookies, $location, $q) {
    var flag = false;

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
          flag = true;
          deferred.resolve(flag);
        }else{
          flag = false;
          deferred.resolve(flag);
        }
      });
      return deferred.promise;
    }

    function logOut(sessionId){
      var r = $resource('api/login/logOut');
      r.save({sessionId: sessionId}, function(data){
        if(data && data.flag === true){
          $cookies.remove('user');
        }else{
            alertify.error('Error logout session');
        }
      });

    }

    function checkStatus(){
      if($cookies.getObject('user') === 'undefined'){
        $location.path('/');
      }else{
        $location.path('/home');
      }
    }

    function getCookie(){
      return $cookies.getObject('user');
    }
});
