const jwt = require('jsonwebtoken');
const appConfig = require('../../config/app');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided.' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({ message: 'Token error.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: 'Token malformatted.' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, appConfig.secret);

    req.refId = decoded.refId;

    return next();
  } catch (err) {
    return res.status(401).send({ message: 'Token invalid.' });
  }
};
