// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user information to the request object.
 *
 * @param   {Object}   req   Express request object
 * @param   {Object}   res   Express response object
 * @param   {Function} next  Express next middleware function
 */
module.exports = (req, res, next) => {
  
  const authHeader = req.headers['authorization'];

 
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token provided, authorization denied' });
  }

  
  const token = authHeader.split(' ')[1];


  if (!token) {
    return res.status(401).json({ msg: 'Invalid token, authorization denied' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.user = decoded.user;

    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
