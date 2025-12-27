const jwt = require('jsonwebtoken');
const Patient = require('../../models/Patient');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to authenticate user with JWT
const authenticateUser = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    
    // Verify user exists in database
    const patient = await Patient.findById(decoded.id);
    if (!patient) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    // In this implementation, we'll check against a list of admin emails
    // In a real app, you'd have a separate admin table or role field in the user table
    const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || ['admin@example.com'];
    
    if (req.user && ADMIN_EMAILS.includes(req.user.email)) {
      // Add admin role to the user object
      req.user.role = 'admin';
      next();
    } else {
      return res.status(403).json({ error: 'Admin access required' });
    }
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  authenticateUser,
  requireAdmin
};