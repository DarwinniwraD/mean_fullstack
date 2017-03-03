
describe('app Test', function() {
	beforeEach(module('quicksite'));

	describe('distance format filter test', function() {
		var formatDistance;
		beforeEach(inject(function ($filter) {
			formatDistance = $filter('formatDistance', {})
		}));

		it('should format a distance string', function() {
			expect(formatDistance(10000)).tobe('10km');
			expect(formatDistance(100)).tobe('100m');
		});
	});
});