/* about page*/
module.exports.about = function (req, res) {
	res.render('generic-text', {
		title: 'About',
		pageHeader: {
			title: 'About',
		}
	});
};

module.exports.angularApp = function(req, res){
	res.render('layout', { title: 'Quicksite' });
};