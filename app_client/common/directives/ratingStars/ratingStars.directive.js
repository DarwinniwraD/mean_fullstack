(function () {

	angular.module('quicksite')
		.directive('ratingStars', ratingStars);

	function ratingStars() {
		return {
			restrict: 'A',
			scope: {
				thisRating: '=rating'
			},
			templateUrl: '/common/directives/ratingStars/rating-stars.template.html'
		};
	};

})();