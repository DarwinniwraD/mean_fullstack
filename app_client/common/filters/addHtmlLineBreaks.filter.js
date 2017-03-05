(function () {
	angular.module('quicksite')
		.filter('addHtmlLineBreaks', addHtmlLineBreaks);

	function addHtmlLineBreaks() {
		return function (text) {
			var output = text.replace(/\n/g, '<br/>');
			return output;
		};
	}
})();