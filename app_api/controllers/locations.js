var mongoose = require('mongoose');
var Loc = mongoose.model('Location');


var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};
var theEarth = (function () {
  var earthRadius = 6371;
  var getDistanceFromRads = function (rads) {
    return parseFloat(rads*earthRadius);
  }
  var getRadsFromDistance = function (distance) {
    return parseFloat(distance / earthRadius);
  };
  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  };
})();



/* create a new location*/
/* api/locations */
module.exports.locationsCreate = function (req, res) {
  Loc.create({
      name: req.body.name,
      address: req.body.address,
      facilities: req.body.facilities,
      coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
      openingTimes: [{
        days: req.body.day1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1
      },{
        days: req.body.day2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      }]
    },function (err, location) {
      if (err) {
        sendJsonResponse(res, 404, err);
      } else {
        sendJsonResponse(res, 201, location)
      }
    }
  );
};

/* get a location from db*/
module.exports.locationsReadOne = function (req, res) {
  if (req.params && req.params.locationsid) {
    Loc.fingById(req.params.locationsid)
    .exec(function (err, location) {
      if (!location) {
        sendJsonResponse(res, 404, {"message": "locationid is not found"});
        return;
      } else if(err){
        sendJsonResponse(res, 404, err);
        return;
      }
      sendJsonResponse(res, 200, location);
    });
  } else {
    sendJsonResponse(res, 404, {"message": "No locationsid is request!"});
  };
};

// update a location
module.exports.locationsUpdateOne = function (req, res) {
  if (!req.params.locationsid) {
    sendJsonResponse(res, 404, {"message", "not found, locationsid is required"});
    return;
  };
  Loc.findById(req.params.locationsid)
    .select('-reviews, -rating')
    .exec(function (err, location) {
      if (!location) {
        sendJsonResponse(res, 404, {
          "message": "locationisid is not found"
        });
      } else if (err){
        sendJsonResponse(res, 400, err);
        return;
      };
      location.name = req.body.name;
      location.address = req.body.address;
      location.facilities = req.body.facilities;
      location.coords = [parseInt(req.body.lng), parseInt(req.body.lat)];
      openingTimes: [{
        days: req.body.day1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1
      },{
        days: req.body.day2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      }];
      location.save(function (err, location) {
        if (err) {
          sendJsonResponse(res, 404, err);
        } else {
          sendJsonResponse(res, 200, location);
        };
      });
    });
};

/* get the list of locations */
module.exports.locationsListByDistance = function (req, res) {
  var lng = parseFloat(params.query.lng);
  var lat = parseFloat(params.query.lat);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    maxDistance: theEarth.getRadsFromDistance(20),
    num: 10
  };
  if (!lng || !lat) {
    sendJsonResponse(res, 404, {"message": "lng and lat query params are required"});
    return;
  }
  Loc.geoNear(point, options, function(err, results, stats) {
    var locations = [];
    if (err) {
      sendJsonResponse(res, 404, err)
    } else {
      results.forEach(function(doc) {
          locations.push({
              distance: theEarth.getDistanceFromRads(doc.dis),
              name: doc.obj.name,
              address: doc.obj.address,
              rating: doc.obj.rating,
              facilities: doc.obj.facilities,
              _id: doc.obj._id
          });
      });
      sendJsonResponse(res, 200, locations);
    }
  });
}

/* delete a location*/
module.exports.locationsDeleteOne = function (req, res) {
  var locationsid = req.params.locationsid;
  if (locationsid) {
    Loc.findByIdRemove(locationsid)
      .exec(function (err, location) {
        if (err) {
          sendJsonResponse(res, 404, err)
        }
        sendJsonResponse(res, 204, null);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "No locationsid"
    })
  }
};

