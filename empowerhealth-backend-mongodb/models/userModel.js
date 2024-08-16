const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  emp_id: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  user_name: {
    type: String,
    default: null,
  },
  role_type: {
    type: String,
    enum: ['Admin', 'Agency', 'Lab', 'User'],
    default: 'User',
  },
  gender: {
    type: String,
    default: null,
  },
  age: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
  lab_info_pdf: {
    type: String,
    default: null,
  },
  latitude: {
    type: String,
    default: null,
  },
  longitude: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  user_status: {
    type: Number,
    default: 0,
    enum: [0, 1], // 0 = Active, 1 = Deactive
  },
  subscription_status: {
    type: Number,
    default: 1, // 0 = Subscribed, 1 = Unsubscribed
  },
  otp: {
    type: String,
    default: null,
  },
  otpSent: {
    type: Boolean,
    default: false,
  },
  otpSentAt: {
    type: Date,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  pincode: {
    type: String,
    default: null,
  },
  fullAddress: {
    type: String,
    default: null,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  otpEmail: {
    type: String,
    default: null,
  },
  otpEmailSent: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: String,
    default: null,
  },
  agency_id: {
    type: String,
    default: null,
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;


