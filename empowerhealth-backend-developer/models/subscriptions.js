const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Subscription =  sequelize.define('subscriptions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lab_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    transaction_id: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    subscription_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    subscription_end: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'subscriptions',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Subscription;
};
