(function () {
	/**
	* quicksite Module
	*
	* Description
	*/
	angular.module('quicksite').
		controller('aboutCtrl', aboutCtrl);


	function aboutCtrl() {
		var vm = this;
		vm.pageHeader ={
			title: 'About Quicksite',
		};
		vm.main = {
			content: 'Lorem ipsum dolor sit amet, \n\nconsectetur adipisicing elit. Iusto repudiandae modi neque delectus beatae, aspernatur cupiditate sint, expedita cum repellendus, aperiam placeat, in ducimus itaque provident est commodi vero tempore fuga reprehenderit eaque consectetur facilis veniam. Blanditiis culpa sed, earum corrupti ipsa, minus molestiae reprehenderit fugiat maxime dolore \n\nullam eius facilis saepe. Dolorem nisi molestiae voluptate sint quae dolor soluta pariatur, enim esse facilis perferendis debitis non sapiente? Vel, dolor sequi veritatis impedit autem magnam, nisi doloremque eveniet voluptates ab dolores in quasi nemo molestiae itaque sit eos consequuntur labore adipisci, ipsa accusantium atque! Explicabo suscipit pariatur sapiente ipsum maiores.'
		}
	}


})();