import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

let store = null
const logger = createLogger()
export const initStore = (reducer, initialState, isServer) => (client) => {
  if (isServer && typeof window === 'undefined') {
    return createStore(
      reducer,
      initialState,
      applyMiddleware(thunkMiddleware, logger, client.middleware()))
  }
  if (!store) {
    const enhancer = compose(
          applyMiddleware(thunkMiddleware, logger, client.middleware())
        )
    store = createStore(reducer, initialState, enhancer)
  }
  return store
}
