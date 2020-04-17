const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, addCard, removeCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), addCard);
router.delete('/:cardId', removeCard);

module.exports = router;
