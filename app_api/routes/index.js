// var express = require('express');
// var router = express.Router();
// var ctrlLocations = require('../controllers/locations');
// var ctrlReviews = require('../controllers/reviews');

<<<<<<< HEAD
=======
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationsid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationsid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationsid', ctrlLocations.locationsDeleteOne);
>>>>>>> 6eb733d0b112988aa933b84a6100ddfd28c40a07

// router.get('/locations', ctrlLocations.locationsListByDistance);
// router.post('/locations', ctrlLocations.locationsCreate);
// router.get('/locations/:locationsid', ctrlLocations.locationsReadOne);
// router.put('/locations/:locationsid', ctrlLocations.locationsUpdateOne);
// router.delete('/locations/:locationsid', ctrlLocations.locationsDeleteOne);

// // reviews
// router.post('/locations/:locationsid/reviews', ctrlReviews.reviewsCreate);
// router.get('/locations/:locationsid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
// router.put('/locations/:locationsid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
// router.delete('/locations/:locationsid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

// module.exports = router;

module.exports = function (app) {
	var users = require('./controllers/users');
	app.get('/users', users.findAll);
	app.get('/users/:id', users.findById);
	app.post('/users', users.add);
	app.put('/users', users.update);
	app.delete('/users', users.delete);
}