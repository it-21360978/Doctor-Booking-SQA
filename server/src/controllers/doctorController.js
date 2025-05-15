const Doctor = require('../models/Doctor');


//get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};


//add a new doctor
exports.addDoctor = async (req, res) => {
  const { name, specialty, hospital, contact } = req.body;
  try {
    const doctor = await Doctor.create({ name, specialty, hospital, contact });
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add doctor' });
  }
};
