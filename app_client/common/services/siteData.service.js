(function () {

	angular.module('quicksite')
		.service('siteData', siteData);

	siteData.$inject = ['$http', '$httpParamSerializerJQLike'];

	function siteData($http, $httpParamSerializerJQLike) {
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
				data: $httpParamSerializerJQLike(data),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
		};


		return {
			locationsByCoords: locationsByCoords,
			locationsById: locationsById,
			addReviewById: addReviewById
		};
	};

})();

/* post form data with the jQuery's $.param  is a common, easy way to serialize the post data
 * here are some references for you:
 * a) https://github.com/angular/angular.js/issues/6039
 * b) http://stackoverflow.com/questions/24710503/how-do-i-post-urlencoded-form-data-with-http-in-angularjs
 * of course, you also can using the transform factory, but it would be more awkward, here is a good case;
 * c) https://www.bennadel.com/blog/2615-posting-form-data-with-http-in-angularjs.htm
 */
// (function () {

// 	angular.module('quicksite')
// 		.service('siteData', siteData);

// 	siteData.$inject = ['$http'];

// 	function siteData($http) {
// 		var locationsByCoords = function (lat, lng) {
// 			return $http({
// 				method: 'GET',
// 				url: '/api/locations?lng='+ lng +'&lat=' + lat +'&maxDistance=90000000000000'});
// 		};
// 		var locationsById = function (locationsid) {
// 			return $http({
// 				method: 'GET',
// 				url: '/api/locations/' + locationsid
// 			});
// 		};

// 		var addReviewById = function (locationsid, data) {
// 			return $http({
// 				method: 'POST',
// 				url: '/api/locations/' + locationsid + '/reviews',
// 				/*param the POST data*/
// 				data: $.param(data),
// 				headers: {
// 					'Content-Type': 'application/x-www-form-urlencoded'
// 				}
// 			});
// 		};


// 		return {
// 			locationsByCoords: locationsByCoords,
// 			locationsById: locationsById,
// 			addReviewById: addReviewById
// 		};
// 	};

// })();