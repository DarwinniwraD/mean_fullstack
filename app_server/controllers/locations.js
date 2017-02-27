var request = require('request');
var apioptions = {
  server: "http://localhost:3000"
};

// if (process.env.NODE_ENV === 'production') {
//   apioptions.server = "https://quicksite.herokuapp.com"
// }


var _formatDistance = function (distance) {
	var numDistance, unit;
	if (distance > 1) {
		numDistance = parseFloat(distance).toFixed(1);
		unit = "km";
	} else {
		numDistance = parseInt(distance*1000, 10);
		unit = "m";
	}
	return numDistance + unit;
};

var _showError = function (req, res, status) {
	var title, content;
	if (status === 404) {
		title = "404, page not found";
		content = "sorry, we can't find this page"
	} else {
		title = status + ", something goes wrong";
		content = "Someting, somewhere has gone just a litter bit wrong"
	};
	res.status(status);
	res.render('generic-text', {
		title: title,
		content: content
	});
};

var renderHomepage = function (req, res, responseBody) {
	var message;
	if (!responseBody instanceof Array) {
		message = "API look up error";
		responseBody = [];
	} else if (!responseBody.length){
			message = "No place was found";
	}
	res.render('locations-list', {
		title: "Quicksite",
		sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
		pageHeader: {
			title: 'Quicksite',
			strapline: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, saepe voluptatem architecto possimus odit perspiciatis asperiores modi iusto. In repudiandae soluta quae est delectus quidem tempora sunt voluptatum, at rerum.'
		},
		locations: responseBody,
		message: message
	});
};

var	renderDetailPage = function (req, res, locDetail) {
	res.render('locations-info', {
		title: locDetail.name,
		pageHeader: {title: locDetail.name},
		sidebar: {
			context: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, temporibus, labore! Nulla qui soluta repudiandae veniam nihil voluptate consequatur, necessitatibus explicabo tempore libero ex quae. Reprehenderit repellendus voluptates mollitia. Suscipit itaque quaerat aliquam ipsa autem, ut delectus voluptatibus quasi libero.',
			callToAction: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et modi neque eaque, quasi rerum, a fugit sint iste. Accusamus, natus!'
		},
		location: locDetail
	});
};

var	renderReviewForm = function (req, res, locDetail) {
	res.render('location-review-form', {
		title: 'Review ' + locDetail.name + 'on quicksite',
		pageHeader: {title: 'Review ' + locDetail.name},
		error: req.query.err
	});
};



var	getLocationInfo = function (req, res, callback) {
	var requestOptions, path;
	path = "/api/locations/" + req.params.locationsid;
	requestOptions = {
		url: apioptions.server + path,
		method: "GET",
		json: {}
	};
	request(
		requestOptions,
		function (err, response, body) {
			var data = body;
			if (response.statusCode === 200) {
				data.coords = {
					lng: body.coords[0],
					lat: body.coords[1]
				};
				callback(req, res, data);
			}
			 else {
				_showError(req, res, response.statusCode);
			}
		}
	);
};



module.exports.homelist = function (req, res) {
	var requestOptions, path;
	path = '/api/locations';
	requestOptions = {
		url : apioptions.server + path,
		method : "GET",
		json: {},
		qs: {
			lng: 121.469113,
			lat: 31.21669,
			maxDistance: 90000000000000
		}
	};
	request(
		requestOptions,
		function (err, response, body) {
			var i, data;
			data = body;
			if (response.statusCode === 200 && data.length) {
				for (var i = 0; i < body.length; i++) {
					data[i].distance = _formatDistance(data[i].distance);
				}
			}
			if (err) {
				console.log(err);
			}else if (response.statusCode === 200) {
				console.log(body);
			}else{
				console.log(response.statusCode);
			}
			renderHomepage(req, res, data);
		});
};


/* location Info */
module.exports.locationInfo = function (req, res) {
	getLocationInfo(req, res, function (req, res, responseData) {
		renderDetailPage(req, res, responseData);
	});
};

/* review info */
module.exports.addView = function (req, res) {
	getLocationInfo(req, res, function (req, res, responseData) {
		renderReviewForm(req, res, responseData);
	});
};

module.exports.doAddView = function (req, res) {
	var requestOptions, path, locationsid, postdata;
	locationsid = req.params.locationsid;
	path = '/api/locations/' + locationsid + '/reviews';
	postdata = {
		author: req.body.name,
		rating: parseInt(req.body.rating, 10),
		reviewText: req.body.review
	};
	requestOptions = {
		url: apioptions.server + path,
		method: "POST",
		json: postdata
	};
	if (!postdata.author || !postdata.rating || !postdata.reviewText) {
		res.redirect('/location/' + locationsid + '/review/new/?err=val');
	} else {
		request(
			requestOptions,
			function (err, response, body) {
				if (response.statusCode === 201) {
					res.redirect('/location/' + locationsid)
				} else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
					res.redirect('/location/' + locationsid + '/review/new/?err=val');
				} else {
					console.log(body);
					_showError(req, res, response.statusCode);
				}
			}
		)
	}
};

// module.exports.homelist = function (req, res) {
// 	renderHomepage(req, res);
// }
