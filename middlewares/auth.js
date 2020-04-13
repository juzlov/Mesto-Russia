const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) {
    return res.status(401).send({ message: 'Authorization failed' });
  }

  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Problems with authorization' });
  }
  req.user = payload;

  return next();
};
