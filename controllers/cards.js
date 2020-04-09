const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        res.status(404).send({ message: 'no cards were found' });
        return;
      }
      res.status(200).send({ cards });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(200).send({ card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};