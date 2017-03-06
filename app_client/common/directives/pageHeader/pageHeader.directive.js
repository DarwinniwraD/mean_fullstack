// pageHeader directive
(function () {
	
	angular.module('quicksite')
		.directive('pageHeader', pageHeader);

	function pageHeader() {
		return {
			restrict: 'EA',
			scope: '=content',
			templateUrl: '/common/directives/pageHeader/page-header.template.html'
		}
	}

})();