const next = require('next');
const express = require('express');
const path = require('path');

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const server = express();

app.prepare().then(() => {
  const handle = app.getRequestHandler();
  server.use('/lib', express.static(path.join(__dirname, './node_modules')));
  server.get('*', (req, res) => handle(req, res));
  if (!dev) {
    require('./server/keystone').start();
  }
  server.listen(process.env.PORT || 8080, () => {
    console.log(`Start app on ${process.env.PORT || 8080}`);
  });
});
