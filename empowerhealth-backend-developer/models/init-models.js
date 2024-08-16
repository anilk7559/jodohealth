var DataTypes = require("sequelize").DataTypes;
var _appointments = require("./appointments");
var _subscriptions = require("./subscriptions");
var _users = require("./users");

function initModels(sequelize) {
  var appointments = _appointments(sequelize, DataTypes);
  var subscriptions = _subscriptions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    appointments,
    subscriptions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
