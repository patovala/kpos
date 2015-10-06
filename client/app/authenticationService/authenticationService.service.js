'use strict';

angular.module('kposApp')
  .service('authenticationService', function ($resource, $cookies, $cookieStore, $location) {
    var msg='', logid;

    return {
      logIn: logIn,
      log0ut: logOut,
      getMsg: getMsg,
      getLogId: getLogId,
      checkStatus: checkStatus
    };

    function logIn(user, password){
      var r = $resource('api/users/logged');
      var promise = r.save({user: user, password: password}, function(data){
        logid = data.logid;
        if(logid){
            $cookies.logid = logid;
            $location.path('/home');
            msg = 'good login';
        }else{
            msg = 'Credenciales inválidas';
            $location.path('/login');
        }

      });
      return promise;
    }

    function logOut (){
        $cookieStore.remove('logid');
        $location.path('/login');
    }


    function checkStatus(){
        if(typeof($cookies.logid) === 'undefined'){
            $location.path('/login');
        }else{
            logid = $cookies.logid;
            $location.path('/home');
        }
    }

    function getMsg(){
        console.log('debug:' + msg); return msg;
    }

    function getLogId (){
        return logid;
    }

  });
