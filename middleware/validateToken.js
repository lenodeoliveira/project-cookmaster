const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const secret = 'minhasenhaforte';

const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(req.headers.authorization, secret);
    const user = await userModel.findEmail(decoded.email);
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuario do token.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = validateToken;
