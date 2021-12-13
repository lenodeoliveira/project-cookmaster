const Joi = require('joi');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt-nodejs');
const rescue = require('express-rescue');
const usersService = require('../service/usersService');

const secret = 'minhasenhaforte';
const SUCCESS = 201;
const OK = 200;

const registerUser = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string(),
    password: Joi.string(),
    email: Joi.string(),
    roles: Joi.string(),
  }).validate(req.body);

  if (error) return next(error);

  const { name, email, password, role } = req.body;

  const newUser = await usersService.registerUser(name, email, password, role);

  if (newUser.message) return next(newUser);

  res.status(SUCCESS).json(newUser);
});

const login = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

  const loginUser = await usersService.login(name, email, password);
  if (loginUser.message) return next(loginUser);

  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };
  const { _id, role } = loginUser;
  const token = jwt.sign({ data: _id, email, role }, secret, jwtConfig);

  res.status(OK).json({ token });
});

module.exports = {
  registerUser,
  login,
};
