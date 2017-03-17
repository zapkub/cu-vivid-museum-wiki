const next = require('next');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

app.prepare().then(() => {
  const keystone = require('./server/keystone');

  keystone.set('routes', (server) => {
    require('./server/routes')(server, app);
  });

  keystone.start(process.env.PORT || 8080, () => {
    console.log(`Start app on ${process.env.PORT || 8080}`);  // eslint-disable-line
  });
});
