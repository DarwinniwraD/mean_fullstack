var mongoose = require('mongoose');

var openingTimeSchema = new mongoose.Schema({
	days: String,
	opening: String,
	closing: String,
	closed: Boolean
});

var reviewSchema = new mongoose.Schema({
	author: String,
	rating: {type: Number, "default": 0, min: 0, max: 5},
	reviewText: String,
	creatOn: {type: Date, "default": Date.now}
});

var locationSchema = new mongoose.Schema({
	name: {type:String, required: true},
	address: String,
	rating: {type: Number, "default": 0, min: 0, max: 5},
	facilities: [String],
	coords: {type:[Number], index: '2dsphere', required: true},
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
});

module.exports = mongoose.model('Location', locationSchema);
