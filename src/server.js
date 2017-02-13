
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';

import next from 'next';


import keystone from './keystone';

import path from 'path';
import cors from 'cors';
import Logdown from 'logdown';
import Schema from './schema';
import resolvers from './resolvers';

// init next
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dir: './src', dev });
const handle = app.getRequestHandler();

const logger = new Logdown({ prefix: 'core' });
if (!process.env.MONGO_URI) {
    process.env.MONGO_URI = 'localhost';
}
logger.info(`start server db => ${process.env.MONGO_URI}`);

require('dotenv').config({ path: path.join(__dirname, '../.env') });


app.prepare()
    .then(() => {
        const server = express();
        server.use(cors());
        server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
        server.use('/graphql', bodyParser.json(), graphqlExpress({
            schema: makeExecutableSchema({
                typeDefs: Schema,
                resolvers,
            }),
        }));

        // Start keystone server
        keystone(server).start();
        // fallback to next
        server.get('*', (req, res) => {
            return handle(req, res);
        });
    });
