require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const config = require('./config');

mongoose.connect(config.database.url, { useNewUrlParser: true });
requireDir(config.database.modelsPath);

app.use(bodyParser.json());
app.use(cors());
app.use('/', require('./app/routes'));

app.listen(config.app.port);
