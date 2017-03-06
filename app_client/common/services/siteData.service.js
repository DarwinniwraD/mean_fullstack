(function () {

	angular.module('quicksite')
		.service('siteData', siteData);

	siteData.$inject = ['$http'];

	function siteData($http) {
		var locationsByCoords = function (lat, lng) {	
			return $http({
				method: 'GET', 
				url: '/api/locations?lng='+ lng +'&lat=' + lat +'&maxDistance=90000000000000'});
		};
		var locationsById = function (locationsid) {
			return $http({
				method: 'GET',
				url: '/api/locations/' + locationsid
			});
		};

		var addReviewById = function (locationsid, data) {
			return $http({
				method: 'POST',
				url: '/api/locations/' + locationsid + '/reviews',
				data: {data: data}
			});
		};


		return {
			locationsByCoords: locationsByCoords,
			locationsById: locationsById,
			addReviewById: addReviewById
		};
	};

})();