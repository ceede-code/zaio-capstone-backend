const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    // Cleanly strip 'Bearer ' regardless of capitalization or extra whitespace
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    // Secret must match userController.js fallback exactly
    const secret = process.env.JWT_SECRET || 'your_secret_key';
    const decoded = jwt.verify(token, secret);
    
    // Attach decoded user data ({ id, username, role }) to the request
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = auth;