

const keystone = require('keystone');
require('dotenv').config();

keystone.init({
  name: 'VividMuseam',
  static: '../public',
  mongo: process.env.MONGO_URI,
  port: 3000,
  'session store': 'mongo',
  updates: 'updates',
  'auto update': true,
  session: true,
  auth: true,
  'user model': 'User',
});

keystone.import('models');
keystone.set('locals', {
  env: keystone.get('env'),
  utils: keystone.utils,
});
keystone.set('nav', {
  users: 'users',
});

keystone.start();
