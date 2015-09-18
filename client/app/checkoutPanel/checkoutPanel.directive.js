'use strict';

function checkoutPanelController($resource) {

	var directive = {
		templateUrl: 'app/checkoutPanel/checkoutPanel.html',
      restrict: 'EA',
      link: function () {},
      controller: checkoutCtrl,
      controllerAs: 'ckc'
	}
	return directive;

	function checkoutCtrl () {
		var ckc = this;

		ckc.paymentProcess = paymentProcess;
		ckc.hola = 'hola';

		return ckc;

		function paymentProcess() {
			var r = $resource('api/orders/add');
    		r.save({cart: {saludo: 'hola'}}, function(data){
    		});
    	console.log('DEBUG');
		}
	}
}

angular.module('kposApp')
  .directive('checkoutPanel', checkoutPanelController);
