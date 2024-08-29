const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Login attempt failed: Username and password are required');
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Login successful for user:', username);
    return res.json({ token, message: 'Login successful' });
  } else {
    console.log('Login attempt failed: Authentication failed');
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

const authorize = expressJwt({
  secret: SECRET_KEY,
  algorithms: ['HS256'],
});

module.exports = { authenticate, authorize };