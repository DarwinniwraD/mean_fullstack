(function () {
	angular.module('quicksite')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject  = ['$routeParams', '$uibModal', 'siteData'];
	function locationDetailCtrl($routeParams, $uibModal, siteData) {
		var vm = this;
		vm.locationid = $routeParams.locationid;

		siteData.locationsById(vm.locationid)
			.then(doneCallbacks, failCallbacks);

		function doneCallbacks(records) {
			vm.data = {
					location: records.data
				};
			vm.pageHeader = {
				title: vm.data.location.name
			};
		};

		function failCallbacks(e) {
			console.log(e);
		};

		vm.popupReviewForm = function () {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: '/reviewModal/reviewModal.view.html',
				controller: 'reviewModalCtrl',
				controllerAs: 'vm',
				resolve: {
					locationData : function () {
						return {
							locationid: vm.locationid,
							locationName: vm.data.location.name
						};
					}
				}
			});
			modalInstance.result.then(function (data) {
				vm.data.location.reviews.push(data);
			});

		};
	};
})();