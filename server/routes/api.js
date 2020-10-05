const express = require('express');

const TripsController = require('../controllers/tripsController'); // middleware

const router = express.Router();

const { ownersList, tripsList, dogsList } = require('../data');

router.get('/owners', TripsController.getAllOwners, (req, res) => {
  console.log('coming get request for owners');
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(res.locals.owners.concat(ownersList));
});

router.get('/owners', TripsController.getAllOwners, (req, res) => {
  console.log('coming get request for single owner');
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(res.locals.ownerData);
});

router.post('/owners/verify', TripsController.verifyOwner, (req, res) => {
  console.log('coming POST request for verifying owners');
  res.status(200).json('success');
});

router.post('/owners', TripsController.addOwner, (req, res) => {
  console.log('coming POST request for owners');
  res.status(200).json('success');
});

router.post('/dogs', TripsController.addDog, (req, res) => {
  console.log('coming POST request for adding dog');
  res.status(200).json('success');
});

router.get('/dogs', TripsController.getDogs, (req, res) => {
  console.log('coming get request for dogs');
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(res.locals.dogs.concat(dogsList));
});

router.get('/trips', TripsController.getAllTrips, (req, res) => {
  console.log('coming get request for all trips');
  // console.log(req);
  // res.set('Access-Control-Allow-Origin', '*');
  // res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
  res.status(200).json(res.locals.trips.concat(tripsList));
});

router.get('/trips/:tripId', TripsController.getTripDetail, (req, res) => {
  console.log('coming get request for a trip\'s detail');
  // console.log(req);
  // res.set('Access-Control-Allow-Origin', '*');
  // res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
  res.status(200).json(res.locals.detail);
});

module.exports = router;
