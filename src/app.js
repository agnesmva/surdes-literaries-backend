const express = require('express');
const cors = require('cors');

const dictionaryRoutes = require('./routes/dictionary-routes');
const memberRoutes = require('./routes/member-routes');
const eventRoutes = require('./routes/event-routes');

const app = express();
app.use(cors());
app.use(express.json());

// para converter BigInt em string no JSON -- esse tb é um middleware igual o express.json
app.use((req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    return oldJson.call(this, JSON.parse(JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )));
  };
  next();
});

// ROTAS
app.use('/api/dictionary', dictionaryRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);

module.exports = app;
