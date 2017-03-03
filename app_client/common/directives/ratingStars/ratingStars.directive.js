(function () {

	// function ratingStars() {
	// 	return {
	// 		restrict: 'A',
	// 		scope: {
	// 			thisRating: '=rating'
	// 		},
	// 		templateUrl: '/common/directives/ratingStars/rating-stars.template.html'
	// 	};
	// };

	// angular.module('quicksite')
	// 	.directive('ratingStars', ratingStars);

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

})();