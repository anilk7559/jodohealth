const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const User =  sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    emp_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "unique_emp_id"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "unique_email"
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "user_name"
    },
    role_type: {
      type: DataTypes.ENUM('Admin','Agency','Lab','User'),
      allowNull: false,
      defaultValue: "User"
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    age: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lab_info_pdf: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "0=Active,1=deactive"
    },
    subscription_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: "0=Active,1=deactive"
    },
    otp: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    otpSent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    otpSentAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fullAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    otpEmail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    otpEmailSent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    discount: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    agency_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
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
      {
        name: "emp_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emp_id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "user_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_name" },
        ]
      },
      {
        name: "unique_emp_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emp_id" },
        ]
      },
      {
        name: "unique_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ],
    hooks: {
      beforeValidate: (user, options) => {
        if (['Admin', 'Agency', 'Lab'].includes(user.role_type)) {
          if (!user.email) {
            throw new Error('Email is required for Admin, Agency, and Lab roles');
          }
          if (!user.name) {
            throw new Error('Name is required for Admin, Agency, and Lab roles');
          }
          if (!user.password) {
            throw new Error('Password is required for Admin, Agency, and Lab roles');
          }
        }
      }
    }
  });

  return User;
};