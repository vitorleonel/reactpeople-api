require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.database.url, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'API in operation.' });
});

app.listen(config.app.port);
