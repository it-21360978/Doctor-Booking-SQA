const express = require('express');
const { getAllDoctors, addDoctor } = require('../controllers/doctorController');
const verifyToken = require('../validations/authMiddleware');
const isAdmin = require("../middleware/isAdmin"); 
const router = express.Router();

router.get('/', getAllDoctors);
router.post("/add", verifyToken, isAdmin, addDoctor); // only for authorized

module.exports = router;
