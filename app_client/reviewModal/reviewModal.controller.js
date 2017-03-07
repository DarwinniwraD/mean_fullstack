(function () {

	angular.module('quicksite')
		.controller('reviewModalCtrl', reviewModalCtrl);

	reviewModalCtrl.$inject = ['$uibModalInstance', 'siteData', 'locationData'];

	function reviewModalCtrl($uibModalInstance, siteData, locationData) {
		var vm = this;
		vm.locationData = locationData;
		vm.modal = {
			cancel : function () {
				$uibModalInstance.dismiss('cancel');
			},
			close : function (result) {
				$uibModalInstance.close(result);
			}
		}
		vm.onSubmit = function () {
			vm.formError = '';
			if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
				vm.formError = "All fields required, please try again!"
				return false;
			} else {
				// return false;
				vm.doAddReview(vm.locationData.locationid, vm.formData);
			};
		}
		vm.doAddReview = function (locationsid, formData) {
			siteData.addReviewById(locationsid, {
				author: formData.name,
				rating: formData.rating,
				reviewText: formData.reviewText
			}).then(doneCallbacks, failCallbacks);

			function doneCallbacks(formData) {
				console.log('Success');
				console.log(formData);
				vm.modal.close(formData);
			};

			function failCallbacks(formData) {
				vm.formError = "your review has not been saved, try again";
			};
			return false;
		}
	}

})();