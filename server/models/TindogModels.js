const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://admin-meng:h0Sq9hbaG1LT95Iw@cluster0.m7nvw.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'TYPO',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const { Schema } = mongoose;

const ownerSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  intro: String,
  age: String,
  dog: String,
  imageUrl: String,
  dogInfo: {
    petName: String,
    intro: String,
    age: String,
    breed: String,
    imageUrl: String,
  },
  // homeworld_id: {
  //   // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
  //   type: Schema.Types.ObjectId,
  //   ref: 'planet',
  // },
});

const Owner = mongoose.model('owner', ownerSchema);

const dogSchema = new Schema({
  petName: String,
  intro: String,
  age: String,
  breed: String,
  imageUrl: String,
  // homeworld_id: {
  //   // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
  //   type: Schema.Types.ObjectId,
  //   ref: 'planet',
  // },
});

const Dog = mongoose.model('dog', dogSchema);

const tripSchema = new Schema({
  tripId: String,
  title: String,
  imageUrl: String,
  location: String,
  price: Number,
  date: String,
  owners: Array,
  // homeworld_id: {
  //   // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
  //   type: Schema.Types.ObjectId,
  //   ref: 'planet',
  // },
});

const Trip = mongoose.model('trip', tripSchema);

module.exports = {
  Owner,
  Dog,
  Trip,
};
