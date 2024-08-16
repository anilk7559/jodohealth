var db = require("../models");
const helper = require("../config/helper");
const { Op, where } = require('sequelize');
const jwt = require("jsonwebtoken");
const razorpay = require('../paymentGatway/razorpay');
const phonepe = require('../paymentGatway/phonepe');

// const { Subscription } = require('../models/subscriptions');


//Password Encryption
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { decode } = require("jsonwebtoken");
const { raw } = require("body-parser");
const moment = require('moment');
let tokenBlacklist = [];

// called a model
const users = db.users;


module.exports = {

  //=============================User Module =====================================
  createSubscription: async (req, res) => {
    try {
      const required = {
        user_id: req.user.id,
      }
      const non_required = {
        lab_id: req.body.lab_id,
        agency_id: req.body.agency_id,
      }

      let requestData = await helper.vaildObject(required, non_required, res);
      const amount = 5000; // amount in paise for 50 INR
      const paymentCapture = 1;//1=Automatically,0=mannuvally
      const currency = 'INR';
      const options = {
        amount: amount * 100,
        currency,
        receipt: `receipt_${requestData.user_id}_${Date.now()}`,
        payment_capture: paymentCapture
      };

      const response = await razorpay.orders.create(options);

      return helper.success(res, "Subscription successfully Created", response);

    } catch (error) {
      console.log(error);
      return helper.error500(res, "Internal Server Error");
    }
  },


  confirmPayment: async (req, res) => {
    try {
      const required = {
        user_id: req.user.id,
      }
      const non_required = {
        lab_id: req.body.lab_id,
        agency_id: req.body.agency_id,
        transaction_id: req.body.transaction_id,
        payment_id: req.body.payment_id,
      }

      const subscription_start = new Date();
      const subscription_end = new Date(subscription_start);
      subscription_end.setMonth(subscription_end.getMonth() + 6);

      const subscription = await Subscription.create({
        user_id,
        lab_id,
        agency_id,
        transaction_id,
        subscription_start,
        subscription_end
      });

      return helper.success(res, "Subscription successfully Created", subscription);

    } catch (error) {
      console.log(error);
      return helper.error500(res, "Internal Server Error");
    }
  },

  createPhonepePayment: async (req, res) => {
    try {
      const { amount, orderId } = req.body;
      const response = await phonepe.createPayment(amount, orderId);
      return helper.success(res, "Subscription successfully Created", response);

    } catch (error) {
      console.log(error);
      return helper.error500(res, "Internal Server Error");
    }
  },


  phonepeCallback: async (req, res) => {
    try {
      const { amount, orderId } = req.body;
      const response = await phonepe.createPayment(amount, orderId);
      return helper.success(res, "Subscription successfully Created", response);

    } catch (error) {
      console.log(error);
      return helper.error500(res, "Internal Server Error");
    }
  },



  createGooglepayPayment: async (req, res) => {
    try {
      const { amount, user_id, lab_id, agency_id } = req.body;
      const paymentCapture = 1;
      const currency = 'INR';

      const options = {
        amount: amount * 100,
        currency,
        receipt: `receipt_${user_id}_${Date.now()}`,
        payment_capture: paymentCapture
      };
      const response = await razorpay.orders.create(options);

      return helper.success(res, "Subscription successfully Created", response);

    } catch (error) {
      console.log(error);
      return helper.error500(res, "Internal Server Error");
    }
  },


};