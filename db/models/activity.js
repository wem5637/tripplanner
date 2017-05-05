const Sequelize = require('sequelize');
const db = require('../_db');

const Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age_range: {
    type: Sequelize.STRING,
    defaultValue: '*',
  },
});

module.exports = Activity;
