var mongoose = require('mongoose'), 
	User = mongoose.model('User');
exports.findAll = function (req, res) {
	User.find({}, function (err, results) {
		return res.send(results);
	});
};
exports.findById = function () {}
exports.add = function () {}
exports.update = function () {}
exports.delete = function () {}
