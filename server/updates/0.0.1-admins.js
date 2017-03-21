/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */
require('dotenv').config();

exports.create = {
  User: [
{ 'name.first': 'Admin', 'name.last': 'User', email: process.env.ROOT_EMAIL || 'root@root.com', password: process.env.ROOT_PASS || 'root', isAdmin: true },
  ],
};
