const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect('mongodb://buyFood:buyFood@localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: 'sos10' // not working on connection string
});

app.use(express.json());
app.use(routes);

app.listen(3333);
