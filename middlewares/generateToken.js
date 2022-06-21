const crypto = require('crypto');

const generateToken = (req, res) => {
  const tokenString = crypto.randomBytes(8).toString('hex');
  const token = { token: tokenString }; 
  return res.status(200).json(token);
};

module.exports = generateToken;