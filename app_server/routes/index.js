var express = require('express');
var router = express.Router();
// var ctrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

/* GET home page. */
// router.get('/', ctrlLocations.homelist);
router.get('/', ctrlOthers.angularApp);
router.get('/location/:locationsid', ctrlLocations.locationInfo);
router.get('/location/:locationsid/review/new', ctrlLocations.addView);
router.post('/location/:locationsid/review/new', ctrlLocations.doAddView);

router.get('/about', ctrlOthers.about);

module.exports = router;
