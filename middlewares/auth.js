const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  const unauthorized = new Unauthorized('Authorization required');
  if (!authorization) {
    return res.status(unauthorized.statusCode).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    return res.status(unauthorized.statusCode).send({ message: 'Ошибка авторизации' });
  }
  req.user = payload;

  return next();
};
