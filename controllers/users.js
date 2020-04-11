const bcrypt = require('bcryptjs');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        res.status(404).send({ message: 'no users were found' });
        return;
      }
      res.status(200).send({ data: users });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'invalid id' });
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.addUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.find({ email })
    .then((mail) => {
      if (mail) {
        res.status(404).send({ message: 'Email already registred' });
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, about, email, password: hash, avatar,
        }))
        .then((user) => res.send({
          name: user.name, about: user.about, email: user.email, avatar: user.avatar,
        }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send();
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
