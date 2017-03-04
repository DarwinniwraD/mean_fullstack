(function () {

	angular.module('quicksite')
		.service('geolocation', geolocation);

	function geolocation() {
		var getPosition = function (cbSucess, cbError, cbNoGeo) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(cbSucess, cbError);
			} else {
				cbNoGeo();
			}
		};
		return {
			getPosition: getPosition
		};
	};


})();