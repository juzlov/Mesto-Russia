/* eslint-disable import/no-dynamic-require */
const path = require('path');

const router = require('express').Router();

const users = require((path.join(__dirname, '../data', 'users.json')));

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:_id', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = users.find((elem) => elem._id === req.params._id);

  if (user !== undefined) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});

module.exports = router;
