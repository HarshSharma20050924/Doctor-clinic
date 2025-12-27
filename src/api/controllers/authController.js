const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Patient = require('../../models/Patient');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Register a new patient
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingPatient = await Patient.findByEmail(email);
    if (existingPatient) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create patient
    const newPatient = await Patient.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newPatient.id, email: newPatient.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict'
    });

    res.status(201).json({
      id: newPatient.id,
      name: newPatient.name,
      email: newPatient.email
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login patient
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find patient by email
    const patient = await Patient.findByEmail(email);
    if (!patient) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, patient.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: patient.id, email: patient.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict'
    });

    res.json({
      id: patient.id,
      name: patient.name,
      email: patient.email
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login
};