const userModel = require('../models/usersModel');

const validateNameAndPassword = (name, password) => {
  if (!name || name === undefined || !password || !password === undefined) {
    return { message: 'Invalid entries. Try again.' };
  }
  return {};
};

const validateEmail = async (email) => {
  const emailExists = await userModel.findEmail(email);
  const regEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  console.log(email);

  if (emailExists) {
    return {
      code: 409,
      message: 'Email already registered',
    };
  }

  if (!email || !regEmail.test(email)) {
    return { message: 'Invalid entries. Try again.' };
  }

  return {};
};

const loginValidateEmailAndPassword = (email, password) => {
  if (!email || email === undefined || password === undefined || !password) {
    return {
      code: 401,
      message: 'All fields must be filled',
    };
  }

  return {};
};

const registerUser = async (name, email, password, role) => {
  const emailExists = await validateEmail(email);

  if (emailExists.message) return emailExists;
  const verifyName = validateNameAndPassword(name, password);
  if (verifyName.message) return verifyName;
  const user = await userModel.registerUser(name, email, password, role);
  return user;
};

const login = async (name, email, password) => {
  const validateUser = loginValidateEmailAndPassword(email, password);
  if (validateUser.message) return validateUser;
  const user = await userModel.findEmail(email);
  if (!user || user.password !== password) {
    return {
      code: 401,
      message: 'Incorrect username or password',
    };
  }
  return user;
};

module.exports = {
  registerUser,
  login,
};
