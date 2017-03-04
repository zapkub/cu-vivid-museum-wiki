const keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

const Location = new keystone.List('Location', {
});

Location.add({
  name: { type: String, required: true },
  label: { type: String },
  description: { type: String, required: false },
});

Location.relationship({ ref: 'Plant', path: 'displayLocation' });
Location.register();

