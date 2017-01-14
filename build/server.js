'use strict';

var _bodyParser = require('body-parser');

var bodyParser = _interopRequireWildcard(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _next = require('next');

var _next2 = _interopRequireDefault(_next);

var _keystone = require('./keystone');

var _keystone2 = _interopRequireDefault(_keystone);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _logdown = require('logdown');

var _logdown2 = _interopRequireDefault(_logdown);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// init next
var dev = process.env.NODE_ENV !== 'production';
var app = (0, _next2.default)({ dir: './src', dev: dev });
var handle = app.getRequestHandler();

var logger = new _logdown2.default({ prefix: 'core' });
logger.info('start server db => ' + process.env.MONGO_URI);

require('dotenv').config({ path: _path2.default.join(__dirname, '../.env') });

app.prepare().then(function () {
    var server = (0, _express2.default)();
    server.use((0, _cors2.default)());
    server.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));
    server.use('/graphql', bodyParser.json(), (0, _graphqlServerExpress.graphqlExpress)({
        schema: (0, _graphqlTools.makeExecutableSchema)({
            typeDefs: _schema2.default,
            resolvers: _resolvers2.default
        })
    }));

    (0, _keystone2.default)(server).start(function () {});

    server.get('*', function (req, res) {
        return handle(req, res);
    });
});
//# sourceMappingURL=server.js.map