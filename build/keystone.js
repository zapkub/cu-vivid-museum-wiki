'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// Simulate config options from your production environment by
// customising the .env file in your project's root folder.


var path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	name: 'cms',
	brand: 'cms',
	sass: 'cms/public',
	static: 'cms/public',
	favicon: 'cms/public/favicon.ico',
	views: 'cms/templates/views',
	'view engine': 'jade',
	mongo: 'mongodb://' + process.env.MONGO_URI + ':27017/cms',
	port: 3000,
	updates: 'cms/updates',
	'auto update': true,
	session: true,
	auth: true,
	'user model': 'User'
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js


keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes
keystone.set('routes', require('./cms/routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	category: ['herbaria', 'gardens', 'museums'],
	users: 'users'
});

exports.default = function (app) {
	keystone.app = app;
	return keystone;
};
//# sourceMappingURL=keystone.js.map