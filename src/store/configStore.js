
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

/**
 * Dev middleware
 */
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from '../reducers';
let latestStore;
let __apolloClient;

let rootReducer;
const logger = createLogger();
const promise = promiseMiddleware();
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

export default function configureStore(initState: Object, client: any, isServer: boolean) {
    __apolloClient = client.reducer();
    if (isServer && typeof window === 'undefined') {
        rootReducer = combineReducers(Object.assign({}, reducers, { apollo: __apolloClient }));
        latestStore = createStore(
            rootReducer,
            {},
            compose(applyMiddleware(thunk, promise, logger, client.middleware())));
        return latestStore;
    } else {
        if (!window.store) {
            const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
            rootReducer = combineReducers(Object.assign({}, reducers, { apollo: __apolloClient }));
            window.store = latestStore = createStore(
                rootReducer,
                {},
                composeEnhancers(applyMiddleware(thunk, promise, logger, client.middleware())));

        }
        return window.store;
    }
}
