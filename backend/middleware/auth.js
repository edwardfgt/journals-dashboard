const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

const authorize = expressJwt({
  secret: SECRET_KEY,
  algorithms: ['HS256'],
});

module.exports = { authenticate, authorize };