
// custom keystone app
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const cors = require('cors');
const cloudinary = require('cloudinary-core');
const keystone = require('keystone');

const schema = require('../schema');
const Plant = require('../models/Plant');

const cl = cloudinary.Cloudinary.new();
cl.fromEnvironment();

module.exports = (server) => {
  server.use(cors());
  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  server.use('/graphql', graphqlExpress(req => ({
    schema,
    context: {
      isAdmin: req.isAdmin,
      cl,
      Plant,
      Museum: keystone.list('Museum').model,
      Garden: keystone.list('Garden').model,
      Herbarium: keystone.list('Herbarium').model,
    },
  })));
};

