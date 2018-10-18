const express = require('express');
const routes = express.Router();

const controllers =  require('../controllers');

routes.post('/auth', controllers.authController.auth);

routes.get('/', (req, res, next) => {
  res.json({ message: 'API in operation.' });
});

module.exports = routes;
