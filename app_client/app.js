	angular.module('quicksite', []);
	angular.module('quicksite', ['ngRoute'])
		.config(['$routeProvider', config]);

	function config($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/home/home.view.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.otherwise({redirectTo: '/'});
	};

