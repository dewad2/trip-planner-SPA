const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");
// const sequelize = require('Sequelize')
// const {Hotel, Restaurant, Activity} = require('../models')

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWRld2FhbCIsImEiOiJjamQxdWtnNDUwaWU5MzNxZGRsOGw1dTN3In0.ZPZYioFsfTn1fNFC1a8v6w';

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

fetch('/api/attractions')
.then(result => {
  return result.json()
})
.then(attractions => {
  for(var i = 0; i < attractions.hotels.length; i++) {
    const eachHotel = attractions.hotels[i];
    const createdHotelTag = document.createElement('option')
    createdHotelTag.text = eachHotel.name;
    createdHotelTag.value = eachHotel.name;
    const hotel = document.getElementById('hotels-choices')
    hotel.appendChild(createdHotelTag);
  }

  for (var i = 0; i < attractions.restaurants.length; i++) {
    const eachRestaurant = attractions.restaurants[i];
    const createdRestaurantTag = document.createElement('option')
    createdRestaurantTag.text = eachRestaurant.name;
    createdRestaurantTag.value = eachRestaurant.name;
    const restaurant = document.getElementById('restaurants-choices')
    restaurant.appendChild(createdRestaurantTag);
  }

  for (var i = 0; i < attractions.activities.length; i++) {
    const eachActivity = attractions.activities[i];
    const createdActivityTag = document.createElement('option')
    createdActivityTag.text = eachActivity.name;
    createdActivityTag.value = eachActivity.name;
    const activity = document.getElementById('activities-choices')
    activity.appendChild(createdActivityTag);
  }

  document.getElementById("hotels-add").addEventListener("click", function() {
    const select = document.getElementById('hotels-choices');
    const selectedId = select.value;
    const list = document.getElementById('hotels-list');
    const createdHotelListItem = document.createElement('li');
    createdHotelListItem.appendChild(document.createTextNode(selectedId));
    list.appendChild(createdHotelListItem);
    const hotelsArray = attractions.hotels;
    const foundHotel = hotelsArray.find(function(obj) {
      return obj.name === selectedId;
    })
    const coords = foundHotel.place.location;
    
    buildMarker('hotels', coords).addTo(map);
  })
  
  document.getElementById("activities-add").addEventListener("click", function () {
    const select = document.getElementById('activities-choices');
    const selectedId = select.value;
    const list = document.getElementById('activities-list');
    const createdActivityListItem = document.createElement('li');
    createdActivityListItem.appendChild(document.createTextNode(selectedId));
    list.appendChild(createdActivityListItem);
    const activitiesArray = attractions.activities;
    const foundActivity = activitiesArray.find(function (obj) {
      return obj.name === selectedId;
    })
    const coords = foundActivity.place.location;

    buildMarker('activities', coords).addTo(map);

  })

  document.getElementById("restaurants-add").addEventListener("click", function () {
    const select = document.getElementById('restaurants-choices');
    const selectedId = select.value;
    const list = document.getElementById('restaurants-list');
    const createdRestaurantListItem = document.createElement('li');
    createdRestaurantListItem.appendChild(document.createTextNode(selectedId));
    list.appendChild(createdRestaurantListItem);
    const restaurantsArray = attractions.restaurants;
    const foundRestaurant = restaurantsArray.find(function (obj) {
      return obj.name === selectedId;
    })
    const coords = foundRestaurant.place.location;

    buildMarker('restaurants', coords).addTo(map);
  })

  
})
.catch(console.error);


// attractions.hotels = array
//iterate through the array
//at each element, get the 'name' value
//create element
//append that to the hotel option








