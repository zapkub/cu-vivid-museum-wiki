

module.exports = (externalContext) => {
  const { keystone } = externalContext;
      // create schema from models
  const schema = require('./schema')(externalContext);
  const context = Object.assign({
    schema,
  }, externalContext);

  keystone.set('routes', (app) => {
    require('./routes')(app, context);
  });

  return {
    start(callback) {
      keystone.start(3000, () => {
        if (callback) callback();
      });
    },
  };
};
