const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token received:', token); // Debug log
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug log
    
    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log('User not found in database'); // Debug log
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('Found user in database:', user); // Debug log

    // Add complete user data to request object
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      studentId: user.studentId,
      department: user.department
    };

    console.log('Auth middleware - User data added to request:', req.user); // Debug log
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth; 