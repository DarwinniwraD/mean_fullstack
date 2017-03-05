	angular.module('quicksite', []);
	angular.module('quicksite', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

	angular.module('quicksite')
		.config(['$routeProvider', '$locationProvider', config]);

	function config($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				controller: 'homeCtrl',
				controllerAs: 'vm',
				templateUrl: '/home/home.view.html'
			})
			.when('/about', {
				controller: 'aboutCtrl',
				controllerAs: 'vm',
				templateUrl: '/common/views/generic.view.html'
			})
			.when('/location/:locationid', {
				controller: 'locationDetailCtrl',
				controllerAs: 'vm',
				templateUrl: '/locationDetail/location-detail-template.html'
			})
			.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode({
			enabled: true , 
			requireBase: false
		});
	};

