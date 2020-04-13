const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      if (!cards) {
        res.status(404).send({ message: 'no cards were found' });
        return;
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
        res.status(404).send({ message: 'no cards with this id' });
        return;
      }
      if (!card.owner.equals(req.user._id)) {
        res.status(404).send({ message: 'you can delete only yours cards' });
        return;
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then((cards) => res.status(200).send({ data: cards }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
