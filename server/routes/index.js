
// custom keystone app
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const cors = require('cors');

const schema = require('../schema');

module.exports = (app) => {
  app.use(cors());
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  app.use('/graphql', graphqlExpress(req => ({
    schema,
    context: {
      req,
    },
  })));
};

