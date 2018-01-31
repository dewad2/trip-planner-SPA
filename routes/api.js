const express = require('express');
const router = express.Router();
const { Hotel, Restaurant, Activity } = require('../models');

module.exports = router;

// router.get('/attractions', function(req, res, next) {
// const hotelPromise = Hotel.findAll({
//     include : [{all :true}]
// })

// const restaurantPromise = Restaurant.findAll({
//     include: [{ all: true }]
// })

// const activityPromise = Activity.findAll({
//     include:[{ all: true }]
// });

// Promise.all([hotelPromise, restaurantPromise, activityPromise])
//     .then(function(results) {
//         results.forEach((eachResult) => {
//             res.json(eachResult);
//         })
//     })
//     .catch(next);

// })

var allAttractions = {};

router.get('/attractions', (req, res, next) => {
    Hotel.findAll({
        include : [{all:true}]
    })
    .then(function (hotels) {
        allAttractions.hotels = hotels;
        return Restaurant.findAll({
            include: [{ all: true }]
        });
    })
    .then(function (restaurants) {
        allAttractions.restaurants = restaurants;
        return Activity.findAll({
            include: [{ all: true }]
        });
    })
    .then(function (activities) {
        allAttractions.activities = activities;
    })
    .then(function () {
        res.json(allAttractions);
    })
    .catch(next);
});
