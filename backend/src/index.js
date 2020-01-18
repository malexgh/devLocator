const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://buyFood:buyFood@localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: 'sos10' // not working on connection string
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
