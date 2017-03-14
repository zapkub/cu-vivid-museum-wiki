const next = require('next');
const express = require('express');
const path = require('path');

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

app.prepare().then(() => {
  const keystone = require('./server/keystone');
  const handle = app.getRequestHandler();
  keystone.set('routes', (server) => {
    require('./server/routes')(server);
    server.use('/lib', express.static(path.join(__dirname, './node_modules')));
    server.all('*', (req, res) => handle(req, res));
  });

  keystone.start(process.env.PORT || 8080, () => {
    console.log(`Start app on ${process.env.PORT || 8080}`);
  });
});
