var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* POST a new review, providing a locationsid */
/* /api/locations/:locationsid/reviews */
module.exports.reviewsCreate = function () {
  var locationsid = req.params.locationsid;
  if (locationsid) {
    Loc.fingById(locationsid).exec(function (err, location) {
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        doAddReview(req, res, location);
      }
    });
  } else {
    sendJsonResponse(res, 404, {"message": "not found, lodationsid is required"});
  }
};

var doAddReview = function (req, res, location) {
  if (!location) {
    sendJsonResponse(res, 404, {"message", "locationsid not found"});
  } else {
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save(function (err, location) {
      var thisReview,
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length-1];
        sendJsonResponse(res, 201, thisReview);
      }
    });
  };
};

var updateAverageRating =function (locationsid) {
  Loc.findById(locationsid).select('rating reviews').exec(function (err, location) {
    if (!err) {
      doSetAverageRating(location);
    }
  });
};

var doSetAverageRating = function (location) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (location.reviews && location.reviews.length > 0) {
    reviewCount = lcoation.reviews.length;
    ratingTotal = 0;
    for (var i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + location.reviews[i].rating;
    };
    ratingAverage = parseInt(ratingTotal/reviewCount, 10);
    location.rating = ratingAverage;
    location.save(function (err,) {
      if (err) {
        console.log(err); 
      } else {
        console.log('Average rating updated to' + ratingAverage);
      }
    });
  }
};

module.exports.reviewsReadOne = function () {
  if (req.params && req.params.locationsid) {
    Loc.fingById(req.params.locationsid)
    .select('name reviews')
    .exec(function (err, location) {
      var response, review;
      if (!location) {
        sendJsonResponse(res, 404, {"message": "locationid is not found"});
        return;
      } else if(err){
        sendJsonResponse(res, 404, err);
        return;
      }
      if (location.reviews && location.reviews.length > 0) {
        review = locationsid.reviews.id(req.params.reviewid);
        if (!review) {
          sendJsonResponse(res, 404, {"message": "reviews not found"});
        }else{
          response = {
            location: {
              name: location.name,
              id: req.params.reviewid
            },
            review: review
          };
          sendJsonResponse(res, 200, response);
        }
      } else {
        sendJsonResponse(res, 404, {"message": "no reviews found"})
      }
      sendJsonResponse(res, 200, location);
    });
  } else {
    sendJsonResponse(res, 404, {"message": "No locationsid and reviewid are requested!"});
  };
};

module.exports.reviewsUpdateOne = function (req, res) {
  if (!req.params.locationsid || !req.params.reviewid) {
    sendJsonResponse(res, 404, {
      "message": "locationsid and reviewid are required"
    });
    return;
  }
  Loc.fingById(locationsid)
    .select('reviews')
    .exec(function (err, location) {
      var thisReview;
      if (!location) {
        sendJsonResponse(res, 404, {
          "message": "locationsid not found"
        });
        return;
      } else if(err){
        sendJsonResponse(res, 404, err);
        return;
      }
      if(location.reviews && location.reviews.length > 0){
        thisReview = lcoation.reviews.id(location.params.reviewid);
        if (!thisReview) {
          sendJsonResponse(res, 404, {"message": "reviews not found"});
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          location.save(function (err, location) {
            if (err) {
              sendJsonResponse(res, 404, err)
            } else {
              updateAverageRating(location._id);
              sendJsonResponse(res, 200, thisReview);
            };
          });
        }
      }else{
        sendJsonResponse(res, 404, {"message": "no review to update"});
      }
    })
};

module.exports.reviewsDeleteOne = function (req, res) {
  if (!req.params.locationsid || !req.params.reviewid) {
    sendJsonResponse(res, 404, {
      "message": "locationsid and reviewid are required"
    });
    return;
  }
  Loc.fingById(locationsid)
    .select('reviews')
    .exec(function (err, location) {
      var thisReview;
      if (!location) {
        sendJsonResponse(res, 404, {
          "message": "locationsid not found"
        });
        return;
      } else if(err){
        sendJsonResponse(res, 404, err);
        return;
      }
      if(location.reviews && location.reviews.length > 0){
        thisReview = lcoation.reviews.id(location.params.reviewid);
        if (!thisReview) {
          sendJsonResponse(res, 404, {"message": "reviews not found"});
        } else {
          thisReview.remove();
          location.save(function (err, location) {
            if (err) {
              sendJsonResponse(res, 404, err)
            } else {
              updateAverageRating(location._id);
              sendJsonResponse(res, 200, thisReview);
            };
          });
        }
      }else{
        sendJsonResponse(res, 404, {"message": "no review to delete"});
      }
    });
};