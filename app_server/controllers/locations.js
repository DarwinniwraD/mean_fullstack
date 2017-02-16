/* home list page */
module.exports.homelist = function (req, res) {
	res.render('locations-list', {
		title: 'Home',
		pageHeader: {
			title: 'Quicksite',
			strapline: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, saepe voluptatem architecto possimus odit perspiciatis asperiores modi iusto. In repudiandae soluta quae est delectus quidem tempora sunt voluptatum, at rerum.'
		},
		sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
		locations: [{
			name: 'Quicksite1',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 1,
			facilities: ['Hot drinks', 'Food', 'Premium wifi'],
			distance: '100m'
		},{
			name: 'Quicksite2',
			address: '123 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Hot drinks', 'Food', 'Premium wifi', 'Premium wifi'],
			distance: '200m'
		},{
			name: 'Quicksite3',
			address: '128 High Street, Reading, RG6 1PS',
			rating: 2,
			facilities: ['Hot drinks', 'Food', 'Premium wifi'],
			distance: '300m'
		},{
			name: 'Quicksite4',
			address: '122 High Street, Reading, RG6 1PS',
			rating: 5,
			facilities: ['Hot drinks', 'Premium wifi'],
			distance: '100m'
		}]
	});
};

/* location Info */
module.exports.locationInfo = function (req, res) {
	res.render('locations-info', {title: 'Location Info'});
};

/* review info */
module.exports.addView = function (req, res) {
	res.render('location-review-form', {title: 'Add View'});
};