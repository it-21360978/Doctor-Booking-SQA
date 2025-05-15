const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  date: Date,
  status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
