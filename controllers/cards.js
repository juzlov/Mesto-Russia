const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('no cards were found');
      }
      res.status(200).send({ data: cards });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.removeCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('no cards with this id');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new Forbidden('you can delete only yours cards');
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then((cards) => res.status(200).send({ data: cards }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
