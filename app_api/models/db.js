<<<<<<< HEAD
// var mongoose = require( 'mongoose' );

// var gracefulShutdown;

// var dbURI = 'mongodb://localhost/tquicksie';
// if (process.env.NODE_ENV === 'production') {
//     dbURI = process.env.MONGOLAB_URI;
// }

// mongoose.connect(dbURI);

// mongoose.connection.on('connected', function () {
// 	console.log('Mongoose connected to ' + dbURI);
// });
// mongoose.connection.on('error', function (err) {
// 	console.log('Mongoose connection error' + err)
// });
// mongoose.connection.on('disconnected', function () {
// 	console.log('mongoose disconnected');
// });

// gracefulShutdown = function(msg, callback) {
// 	mongoose.connection.close(function () {
// 		console.log('mongoose disconnected through' + msg);
// 		callback();
// 	});
// };

// process.once('SIGUSR2', function () {
// 	gracefulShutdown('nodemon restart', function () {
// 		process.kill(process.pid, 'SIGUSR2');
// 	});
// });

// process.on('SIGINT', function () {
// 	gracefulShutdown('app termination', function () {
// 		process.exit(0);
// 	});
// });

// process.on('SIGTERM', function () {
// 	gracefulShutdown('Heroku app shutdown', function () {
// 		process.exit(0);
// 	});
// });

// require('./locations');
=======
var mongoose = require( 'mongoose' );

var gracefulShutdown;

var dbURI = 'mongodb://localhost/tquicksie';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error' + err)
});
mongoose.connection.on('disconnected', function () {
	console.log('mongoose disconnected');
});

gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function () {
		console.log('mongoose disconnected through' + msg);
		callback();
	});
};

process.once('SIGUSR2', function () {
	gracefulShutdown('nodemon restart', function () {
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', function () {
	gracefulShutdown('app termination', function () {
		process.exit(0);
	});
});

process.on('SIGTERM', function () {
	gracefulShutdown('Heroku app shutdown', function () {
		process.exit(0);
	});
});

require('./locations.js');
>>>>>>> 6eb733d0b112988aa933b84a6100ddfd28c40a07
