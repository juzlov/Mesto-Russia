const router = require('express').Router();
const { getCards, addCard, removeCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', addCard);
router.delete('/:cardId', removeCard);

module.exports = router;
