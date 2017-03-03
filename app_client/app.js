	angular.module('quicksite', []);
	angular.module('quicksite', ['ngRoute']);

	function config($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/home/home.view.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.otherwise({redirectTo: '/'});
	};


	angular.module('quicksite')
		.config(['$routeProvider', config]);