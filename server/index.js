
const keystone = require('keystone');

require('dotenv').config();

keystone.init({
  name: 'VividMuseam',
  brand: 'Chula',
  static: '../public',
  mongo: process.env.MONGO_URI || 'localhost:27017/vivid',
  port: 3000,
  'session store': 'mongo',
  updates: 'updates',
  'auto update': true,
  session: true,
  auth: true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET || 'development secret',
});
keystone.set('cloudinary config', process.env.CLOUDINARY_URL);
keystone.import('models');
keystone.set('routes', require('./routes'));

keystone.set('locals', {
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
  _: require('lodash'),
});
keystone.set('nav', {
  users: 'users',
});

keystone.start();
