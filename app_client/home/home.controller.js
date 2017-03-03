	/**
	* home controller Module
	*
	* Description
	*/
(function () {

	homeCtrl.$inject = ['$scope', 'siteData', 'geolocation'];
	
	function homeCtrl($scope, siteData, geolocation) {
		var vm = this;
		vm.pageHeader = {
			title : "Siteeeeeeeeee",
			strapline: 'Lorem ipsum dolor sit amet'
		};
		vm.sidebar = {
			content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum a eveniet est ea. Debitis perspiciatis officiis perferendis veritatis ducimus consequatur ipsum accusamus odit sit id natus dolores a eius suscipit qui, est veniam ipsam repellendus. Neque voluptatem sed eum dolorem id nisi tenetur dolores, accusantium, autem nostrum laudantium, quod maiores?'
		};
		vm.message = "Checking for place";

		vm.getData = function (position) {
			var lng = position.coords.longitude,
				lat = position.coords.latitude;
			vm.message = "Searching for near place";
			siteData.locationsByCoords(lat, lng)
				.then(function successCallback(data) {
					vm.message = data.length > 0 ? '' : "NO locaionts found!";
					// vm.data = data.data;
					vm.data = {
						locations: data.data
					};
				}, function errorCallback(err) {
					vm.message = "Sorry, somethingis goes wrong";
				});
		};

		vm.showError = function (error) {
			$scope.$apply(function () {
				vm.message = error.message;
			});
		};
		vm.noGeo = function () {
			$scope.$apply(function () {
				vm.message = "Geolocation not supported by this browser";
			});
		};

		geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
	}



	angular.module('quicksite')
		.controller('homeCtrl', homeCtrl);


	angular.module('quicksite')
		.directive('ratingStars', function() {
			return {
				restrict: 'A',
				scope: {
					thisRating: '=rating'
				},
				templateUrl: '/common/directives/ratingStars/rating-stars.template.html'
			};
		}
	);

	angular.module('quicksite')
		.filter('formatDistance', function() {
			return function (distance) {

				var _isNumeric = function (n) {
					return !isNaN(parseFloat(n)) && isFinite(n);
				};

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
		});

})();