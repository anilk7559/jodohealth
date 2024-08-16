const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,  
    required: true,
    ref: 'User',  
  },
  lab_id: {
    type: mongoose.Schema.Types.ObjectId,  
    required: true,
    ref: 'Lab',  
  },
  appointment_date: {
    type: String,
    required: true,
  },
  member_id: {
    type: String,
    required: true,
  },
  prescription: {
    type: String,
    default: null,
  },
  prescription_image: {
    type: String,
    default: null,
  },
  price: {
    type: String,
    default: null,
  },
  upload_bill: {
    type: String,
    default: null,
  },
  upload_report: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
    enum: [0, 1, 2],  // 0 = pending, 1 = accepted, 2 = rejected
  },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
