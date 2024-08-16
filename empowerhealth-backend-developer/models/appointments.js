const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Appointment = sequelize.define('appointments', {
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
      allowNull: false
    },
    // subscription_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    appointment_date: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    member_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    prescription: {
      type: DataTypes.STRING(255),
      allowNull: true
    },    
    prescription_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },   
    price:{
      type: DataTypes.STRING(255),
      allowNull: true
    }, 
    upload_bill:{
      type: DataTypes.STRING(255),
      allowNull: true
    }, 
    upload_report:{
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '0 = pending, 1 = accepted, 2 = rejected'
    }
    
  }, {
    sequelize,
    tableName: 'appointments',
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
  return Appointment;
};
