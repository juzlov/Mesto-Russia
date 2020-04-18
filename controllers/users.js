const bcrypt = require('bcryptjs');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const Unauthorized = require('../errors/Unauthorized');


module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('no users were found');
      }
      res.status(200).send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('invalid id');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.addUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.find({ email })
    // eslint-disable-next-line consistent-return
    .then((mail) => {
      if (mail.length !== 0) {
        throw new Unauthorized('Email already registred');
      } else {
        return bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name, about, email, password: hash, avatar,
          }))
          .then((user) => res.send({
            name: user.name, about: user.about, email: user.email, avatar: user.avatar,
          }));
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send();
    })
    .catch(next);
};
