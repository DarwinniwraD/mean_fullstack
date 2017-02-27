// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

<<<<<<< HEAD
// require('./app_api/models/db');
=======

require('./app_api/models/db');
>>>>>>> 41fe1c0401b8acb1cb398a1782d5df1bf0eb5d36

<<<<<<< HEAD
// var routes = require('./app_server/routes/index');
// var routeApi = require('./app_api/routes/index')
// // var users = require('./app_server/routes/users');
=======
var routes = require('./app_server/routes/index');
var routeApi = require('./app_api/routes/index');
>>>>>>> 6eb733d0b112988aa933b84a6100ddfd28c40a07

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'app_server','views'));
// app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/api', routeApi);
// // app.use('/users', users);

// // catch 404 and forward to error handler
// // app.use(function(req, res, next) {
// //     var err = new Error('Not Found');
// //     err.status = 404;
// //     next(err);
// // });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


// module.exports = app;

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    fs = require('fs');

var dbURI = 'mongodb://localhost/usertest';

mongoose.connect(dbURI);

mongoose.connection.on('error', function () {
    throw new Error('unable to connect to database at ' + dbURI);
});

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app_api/controllers/users.js');
require('./app_api/routes/index.js')(app);

app.listen(3000);
console.log('listning on port 3000');