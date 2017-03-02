(function () {

function siteData($http) {
	var locationsByCoords = function (lat, lng) {	
		return $http({
			method: 'GET', 
			url: '/api/locations?lng='+ lng +'&lat=' + lat +'&maxDistance=90000000000000'});
	};
	return {
		locationsByCoords: locationsByCoords
	};
};

angular.module('quicksite')
	.service('siteData', siteData);
	
})();