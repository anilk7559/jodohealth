const mongoose = require('mongoose');
const User = require('./userModel'); 
const Member = require('./memberModel')
const Appointment = require('./appointmentModel')
const Payment = require('./paymentModel')

require('dotenv').config();
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  User,
  Member,
  Appointment,
  Payment
};
