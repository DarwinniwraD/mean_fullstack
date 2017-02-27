var mongoose = require('mongoose');

<<<<<<< HEAD
// var openingTimeSchema = new mongoose.Schema({
// 	days: {type: String, required: true},
// 	opening: String,
// 	closing: String,
// 	closed: {type: Boolean, required: true}
// });

// var reviewSchema = new mongoose.Schema({
// 	author: {type: String, required: true},
// 	rating: {type: Number, "default": 0, min: 0, max: 5, required: true},
// 	reviewText: {type: String, required: true},
// 	creatOn: {type: Date, "default": Date.now}
// });

// var locationSchema = new mongoose.Schema({
// 	name: {type: String, required: true},
// 	address: String,
// 	rating: {type: Number, "default": 0, min: 0, max: 5},
// 	facilities: String,
// 	distance: {type:[Number], index: '2dsphere'},
// 	openingTimes: [openingTimeSchema],
// 	reviews: [reviewSchema]
// });

var userSchema = new mongoose.Schema({
	name: String,
	email: String,
});

// mongoose.model('Location', locationSchema);
mongoose.model('User', userSchema);
=======
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
>>>>>>> 6eb733d0b112988aa933b84a6100ddfd28c40a07
