const next = require('next');
require('dotenv').config();
// Require our core node modules.
const chalk = require('chalk');

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //


// Added in Node.js v1.4.1, this is a global event handler that will be notified of
// Promise values that do not have a .catch() handler (or some kind) attached to them.
// --
// NOTE: Some 3rd-party Promise libraries like Bluebird and Q will catch unhandled
// rejections and emit an "unhandledRejection" event on the global process object.
process.on('unhandledRejection',
    (reason) => {
      console.log(chalk.red.bold('[PROCESS] Unhandled Promise Rejection'));
      console.log(chalk.red.bold('- - - - - - - - - - - - - - - - - - -'));
      console.log(reason);
      console.log(chalk.red.bold('- -'));
    });
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
