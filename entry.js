const next = require('next');
const express = require('express');
const path = require('path');

const server = express();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const handle = app.getRequestHandler();
  server.use('/lib', express.static(path.join(__dirname, './node_modules')));
  server.get('*', (req, res) => handle(req, res));
  server.listen(8080, () => {
    console.log('Start app on 8080');
  });
})
;
