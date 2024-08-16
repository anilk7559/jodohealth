const path = require("path");
var uuid = require("uuid").v4;
const sequelize = require("sequelize");
const fs = require("fs");
const db = require("../models");
const os = require('os');
const crypto = require('crypto');

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: 'your_key_id',
    key_secret: 'your_key_secret'
  });

module.exports = {

    generate: (length = 6) => {
        let otp = '';
        for (let i = 0; i < length; i++) {
          const digit = crypto.randomInt(0, 10); // Generate a random digit between 0 and 9
          otp += digit;
        }
        return otp;
      },

     


};
