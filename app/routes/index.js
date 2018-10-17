const express = require('express');
const routes = express.Router();

routes.get('/', (req, res, next) => {
  res.json({ message: 'API in operation.' });
});

module.exports = routes;
