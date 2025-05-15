const Appointment = require('../models/Appointment');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  const { doctorId, date } = req.body;
  try {
    const newAppointment = await Appointment.create({
      userId: req.user.id,
      doctorId,
      date,
    });
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
};



// Get all appointments for a user
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .populate('doctorId', 'name specialty hospital contact')
      .sort({ date: -1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};



// cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
    res.status(200).json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel appointment' });
  }
};
