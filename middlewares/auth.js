const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  const unauthorized = new Unauthorized('');
  if (!authorization) {
    return res.status(unauthorized.statusCode).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'top-secret');
  } catch (err) {
    return res.status(unauthorized.statusCode).send({ message: 'Ошибка авторизации' });
  }
  req.user = payload;

  return next();
};
