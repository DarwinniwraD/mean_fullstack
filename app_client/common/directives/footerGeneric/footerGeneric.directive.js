(function () {
	
angular.module('quicksite')
	.directive('footerGeneric', footerGeneric);

	function footerGeneric() {
		return {
			restrict: 'EA',
			templateUrl: 'common/directives/footerGeneric/footer-generic-template.html'
		};
	};
	
})();