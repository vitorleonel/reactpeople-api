const express = require('express');
const routes = express.Router();

const controllers =  require('../controllers');

routes.post('/auth', controllers.authController.auth);
routes.get('/users', controllers.userController.index);
routes.get('/users/:id', controllers.userController.show);
routes.put('/users/:id', controllers.userController.update);

routes.use((req, res) => {
  res.json({ message: 'API in operation.', });
});

module.exports = routes;
