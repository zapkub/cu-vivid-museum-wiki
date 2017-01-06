
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import mongoose from 'mongoose';

import Schema from './schema';
import resolvers from './resolvers';


mongoose.connect('mongodb://localhost/cms');

const app = express();

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: makeExecutableSchema({
        typeDefs: Schema,
        resolvers,
    }),
}));



app.listen(1337, () => {
    console.log('API Start');
});


// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dir: '.', dev });
// const handle = app.getRequestHandler();

// app.prepare()
// .then(() => {
//   const server = express();
//   /**
//    *
//    * Insert GraphQL
//    * by Apollo stack
//    */

//   server.get('*', (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });
// });
