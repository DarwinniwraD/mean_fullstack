(function () {
	
angular.module('quicksite')
	.directive('navigation', navigation);

	function navigation() {
		return {
			restrict: 'EA',
			templateUrl: 'common/directives/navigation/navigation.template.html'
		}
	}
	
})();