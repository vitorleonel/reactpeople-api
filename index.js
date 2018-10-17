require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const config = require('./config');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'API in operation.' });
});

app.listen(config.app.port);
