const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      type: 'Unauthorized',
      message: 'Token not found',
    });
  }
  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({
        type: 'Forbidden',
        message: 'Invalid token',
      });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
