const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect('mongodb://buyFood:buyFood@localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: 'sos10' // not working on connection string
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
