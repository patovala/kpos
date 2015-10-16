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
      var r = $resource('api/users/logged');
      r.save({userName: user, password: password}, function(data){
        if(data && data.result){
          $cookies.putObject('user',data.result);
          flag = true;
          deferred.resolve(flag);
        }else{
          flag = false;
          deferred.resolve(flag);
        }
      });
      return deferred.promise;
    }

    function logOut(){
      $cookies.remove('user');
    }

    function checkStatus(){
      if($cookies.getObject('user') === 'undefined'){
        $location.path('/login');
      }else{
        $location.path('/home');
      }
    }
    function getCookie(){
      return $cookies.getObject('user');
    }
});
