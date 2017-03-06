(function () {
	
	angular.module('quicksite', []);
	angular.module('quicksite', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

	function config($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/home/home.view.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.when('/about', {
				templateUrl: '/common/views/generic.view.html',
				controller: 'aboutCtrl',
				controllerAs: 'vm'
			})
			.when('/location/:locationid', {
				templateUrl: '/locationDetail/location-detail-template.html',
				controller: 'locationDetailCtrl',
				controllerAs: 'vm'
			})
			.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode({
			enabled: true , 
			requireBase: false
		});
	};

	angular.module('quicksite')
		.config(['$routeProvider', '$locationProvider', config]);

})();
