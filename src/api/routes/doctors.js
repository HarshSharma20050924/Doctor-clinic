const express = require('express');
const { getAllDoctors, getDoctorById } = require('../controllers/doctorController');

const router = express.Router();

// GET /api/doctors
router.get('/', getAllDoctors);

// GET /api/doctors/:id
router.get('/:id', getDoctorById);

module.exports = router;