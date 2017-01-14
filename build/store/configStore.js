'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPromiseMiddleware = require('redux-promise-middleware');

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Dev middleware
 */
var latestStore = void 0;
var __apolloClient = void 0;

var rootReducer = void 0;
var logger = (0, _reduxLogger2.default)();
var promise = (0, _reduxPromiseMiddleware2.default)();
/**
 * Hot load reducers
 */
// if (module.hot) {
//     module.hot.accept('../reducers', () => {
//         let newReducer = require('../reducers').default;
//         rootReducer = combineReducers(Object.assign({}, reducers, { apollo: __apolloClient }));
//         latestStore.replaceReducer(rootReducer); // eslint-disable-line global-require
//     });
// }

function configureStore(initState, client, isServer) {
    __apolloClient = client.reducer();
    if (isServer && typeof window === 'undefined') {
        rootReducer = (0, _redux.combineReducers)(Object.assign({}, _reducers2.default, { apollo: __apolloClient }));
        latestStore = (0, _redux.createStore)(rootReducer, {}, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, promise, logger, client.middleware())));
        return latestStore;
    } else {
        if (!window.store) {
            var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
            rootReducer = (0, _redux.combineReducers)(Object.assign({}, _reducers2.default, { apollo: __apolloClient }));
            window.store = latestStore = (0, _redux.createStore)(rootReducer, {}, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default, promise, logger, client.middleware())));
        }
        return window.store;
    }
}
//# sourceMappingURL=configStore.js.map