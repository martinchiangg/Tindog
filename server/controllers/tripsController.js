const models = require('../models/TindogModels');
const { ownersList, tripsList, dogsList } = require('../data');

const tripsController = {};

tripsController.getAllTrips = async (req, res, next) => {
  try {
    await models.Trip.find({}).then((data) => {
      // console.log(data);
      res.locals.trips = data;
      next();
    });
  } catch (err) {
    return next({
      log: `An error occurred while getting single trip: ${err}`,
      message: { err: 'An error occurred, check server for more details' },
    });
  }
};

tripsController.getTripDetail = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    // Temp just for presentation
    if (tripId <= 8) {
      for (const obj of tripsList) {
        if (obj.tripId === tripId) {
          res.locals.detail = obj;
          console.log('res.locals.detail is: ', res.locals.detail);
          next();
        }
      }
    }

    await models.Trip.find({ tripId }).then((data) => {
      // console.log(data);
      res.locals.detail = data;
      next();
    });
  } catch (err) {
    return next({
      log: `An error occurred while getting single trip: ${err}`,
      message: { err: 'An error occurred, check server for more details' },
    });
  }
};

tripsController.verifyOwner = async (req, res, next) => {
  // try {
  //   console.log('req.body is: ', req.body);
  //   const { email, password } = req.body;

  //   await models.Owner.find({ email })
  //     .then((data) => {
  //       console.log('created!');
  //       next();
  //     });
  // } catch (err) {
  //   return next({
  //     log: `An error occurred while creating owner: ${err}`,
  //     message: { err: 'An error occurred, check server for more details' },
  //   });
  // }
};

tripsController.addOwner = async (req, res, next) => {
  try {
    console.log('req.body is: ', req.body);
    const {
      firstName, email, password, intro, age, dog, imageUrl,
    } = req.body;
    await models.Owner.create({
      firstName, email, password, intro, age, dog, imageUrl,
    }).then((data) => {
      console.log('created!');
      next();
    });
  } catch (err) {
    return next({
      log: `An error occurred while creating owner: ${err}`,
      message: { err: 'An error occurred, check server for more details' },
    });
  }
};

tripsController.addDog = async (req, res, next) => {
  try {
    console.log('req.body is: ', req.body);
    const {
      petName, intro, age, breed, imageUrl,
    } = req.body;
    await models.Dog.create({
      petName, intro, age, breed, imageUrl,
    }).then((data) => {
      console.log('created!');
      next();
    });
  } catch (err) {
    return next({
      log: `An error occurred while creating owner: ${err}`,
      message: { err: 'An error occurred, check server for more details' },
    });
  }
};

tripsController.getAllOwners = async (req, res, next) => {
  try {
    await models.Owner.find({}).then((data) => {
      res.locals.owners = data.reverse();
      next();
    });
  } catch (err) {
    return next({
      log: `An error occurred while getting owners: ${err}`,
      message: { err: 'An error occurred, check server for more details' },
    });
  }
};

tripsController.getOwner = async (req, res, next) => {
  try {
    const { firstName } = req.params;
    await models.Owner.findOne({ firstName }).then((data) => {
      res.locals.ownerData = data;
      next();
    });
  } catch (err) {
    return next({
      log: `An error occurred while getting single owner: ${err}`,
      message: { err: 'An error occurred, check server for more details' },
    });
  }
};

tripsController.getDogs = async (req, res, next) => {
  try {
    await models.Dog.find({}).then((data) => {
      res.locals.dogs = data;
      next();
    });
  } catch (err) {
    return next({
      log: `An error occurred while getting all dogs: ${err}`,
      message: { err: 'An error occurred, check server for more details' },
    });
  }
};

// tripsController.addTrip = async (req, res, next) => {
//   try {
//     const {
//       name,
//       gender,
//       species,
//       species_id,
//       birth_year,
//       films,
//     } = req.body;

//     await models.Person.create({
//       name,
//       gender,
//       species,
//       species_id,
//       birth_year,

//     }).then((data) => {
//       console.log('created!');
//       console.log('films: ', films);
//       // console.log('film is: ', data[0]);
//       next();
//     });
//   } catch (err) {
//     return next({
//       log: `An error occurred while adding character: ${err}`,
//       message: { err: 'An error occurred, check server for more details' },
//     });
//   }
// };

module.exports = tripsController;
