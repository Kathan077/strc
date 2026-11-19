const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Token missing.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'srtc_default_jwt_secret');
    const user = await AdminUser.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Administrator account not found.',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authorization token.',
    });
  }
};

module.exports = { protectAdmin };

