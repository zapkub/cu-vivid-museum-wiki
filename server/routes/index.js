
// custom keystone app
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const cors = require('cors');
const cloudinary = require('cloudinary-core');
const schema = require('../schema');
const keystone = require('keystone');

const Plant = require('../models/Plant');
const Museum = require('../models/Museum');
const Garden = require('../models/Garden');
const Herbarium = require('../models/Herbarium');

const cl = cloudinary.Cloudinary.new();
cl.fromEnvironment();

module.exports = (app) => {
  app.use(cors());
  // Use this middleware to authenticate
  // user to context
  // app.use((req, res, next) => {
  //   req.isAdmin = false;
  //   next();
  // });
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  app.use('/graphql', graphqlExpress(req => ({
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

