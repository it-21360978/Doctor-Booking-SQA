const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  hospital: String,
  contact: String
});

module.exports = mongoose.model('Doctor', doctorSchema);
