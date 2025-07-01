const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  emergencyContactName: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  counsellorName: { type: String, required: true },
  counsellorContactNumber: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 