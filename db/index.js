const db = require('./_db');
const Place = require('./models/place');
const Hotel = require('./models/hotel');
const Activity = require('./models/activity');
const Restaurant = require('./models/restaurant');

// associations
Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports = {
  db: db,
  Place: Place,
  Hotel: Hotel,
  Activity: Activity,
  Restaurant: Restaurant,
};
