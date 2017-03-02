
var _isNumeric = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

var ratingStars = function () {
		return {
		scope: {
			thisRating: '=rating'
		},
		restrict: 'A',
		templateUrl: '/angular/rating-stars.html'
	};
};

var formatDistance = function () {
	return function (distance) {
		var numDistance, unit;
		if (distance && _isNumeric(distance)) {
			if (distance > 1) {
				numDistance = parseFloat(distance).toFixed(1);
				unit = "km";
			} else {
				numDistance = parseInt(distance*1000, 10);
				unit = "m";
			}
			return numDistance + unit;
		} else {
			return "?";
		}
	};
};

var geolocation = function () {
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

var quicksiteData = function ($http) {
	var locationsByCoords = function (lat, lng) {	
		return $http({
			method: 'GET', 
			url: '/api/locations?lng='+ lng +'&lat=' + lat +'&maxDistance=90000000000000'});
	};
	return {
		locationsByCoords: locationsByCoords
	};
};

var locationListCtrl = function ($scope, quicksiteData, geolocation) {
	$scope.message = "Checking for place";

	$scope.getData = function (position) {
		var lng = position.coords.longitude,
			lat = position.coords.latitude;
		$scope.message = "Searching for near place";
		quicksiteData.locationsByCoords(lat, lng)
			.then(function successCallback(data) {
				$scope.message = data.length > 0 ? '' : "NO locaionts found!";
				$scope.data = data.data;
				// $scope.data = {
				// 	locations: data.data
				// };
			}, function errorCallback(err) {
				$scope.message = "Sorry, somethingis goes wrong";
			});
	};

	$scope.showError = function (error) {
		$scope.$apply(function () {
			$scope.message = error.message;
		});
	};
	$scope.noGeo = function () {
		$scope.$apply(function () {
			$scope.message = "Geolocation not supported by this browser";
		});
	};

	geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

// note the mening of the empty array in the angular.module
angular.module('quicksite', []);
angular.module('quicksite')
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('quicksiteData', quicksiteData)
	.service('geolocation', geolocation);