const keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

const Reference = new keystone.List('Reference', {
});

Reference.add({
  name: { type: String, required: true, unique: true },
});

Reference.relationship({ ref: 'Plant', path: 'reference' });
Reference.register();

