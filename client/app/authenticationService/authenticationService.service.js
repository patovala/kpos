'use strict';

angular.module('kposApp')
  .service('authenticationService', function ($cookies, $cookieStore, $resource, $location) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var msg = null, logid;

    return{
      logIn : logIn,
      logOut : logOut,
      checkStatus : checkStatus
    };

    function logIn(user, pass){
        var r = $resource('api/users/');
        r.save({'user':user,'pass':pass}, function(data){
        logid = data.logid;
        if(logid){
            $cookies.logid = logid;
            $location.path('/index');
            msg = 'good login';
        }else{
            msg = 'Credenciales inválidas';
            $location.path('/login');
        }
        });
    }

    function logOut(){
        $cookieStore.remove('logid');
        $location.path('/login');
    }


    function checkStatus(){
        if(typeof($cookies.logid) === 'undefined'){
          $location.path('/login');
        }else{
          logid = $cookies.logid;
          $location.path('/index');
        }
    }

  });
