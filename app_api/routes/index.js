var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

router.get('/import', ctrlLocations.import);
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationsid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationsid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationsid', ctrlLocations.locationsDeleteOne);

// reviews
router.post('/locations/:locationsid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationsid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationsid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationsid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;