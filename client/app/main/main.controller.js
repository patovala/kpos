'use strict';

function mainController($location, CONFIG, authenticationService, $cookies, $rootScope, $scope) {
    var mc = this;

    //mc.user = { userName : $cookies.getObject('user') ? $cookies.get('user') : null  }
    mc.user = $cookies.getObject('user') ? $cookies.getObject('user') : null  ;
    mc.checkout = 1;
    mc.togglePanel = togglePanel;
    mc.logo = CONFIG.logo;
    mc.logIn = logIn;
    mc.logOut = logOut;

    init();
  return mc;


    function init() {
        var $rootListeners = {
            changePanel: $rootScope.$on('changePanel', function (event, num) {
                togglePanel(num);
            })
        };
        for(var unbind in $rootListeners){
            $scope.$on('$destroy',$rootListeners[unbind]);
        }
    }

    function togglePanel(num) {
        mc.checkout = num;
    }

    function logIn(){
        authenticationService.logIn(mc.usuer.userName,mc.usuer.password).then(function(data){
            if(data){
                $location.path('/home');
                alertify.success('Good login');
            }else{
                $location.path('/');
                alertify.error('Invalid credentials');
            }
        });
    }

    function logOut(){
        authenticationService.logOut(mc.user.sessionId);
        $location.path('/login');
    }

}

angular.module('kposApp')
  .controller('MainCtrl', mainController);
