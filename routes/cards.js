/* eslint-disable import/no-dynamic-require */
const path = require('path');

const router = require('express').Router();

const cards = require((path.join(__dirname, '../data', 'cards.json')));

router.get('/', (req, res) => {
  res.send(cards);
});

module.exports = router;
