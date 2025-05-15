const express = require('express');
const {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
} = require('../controllers/appointmentController');
const verifyToken = require('../validations/authMiddleware');
const router = express.Router();

router.post('/book', verifyToken, bookAppointment);
router.get('/my', verifyToken, getMyAppointments);
router.put('/cancel/:id', verifyToken, cancelAppointment);

module.exports = router;
