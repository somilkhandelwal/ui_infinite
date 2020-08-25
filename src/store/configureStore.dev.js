/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */

import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { enhanceReduxMiddleware } from 'kepler.gl/middleware';


import root from './reducers/root';

const logger = createLogger();

export const middlewares = enhanceReduxMiddleware([thunk, logger]);

export const enhancers = [applyMiddleware(...middlewares)];


let composeEnhancers = compose;


if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionsBlacklist: [
      '@@kepler.gl/MOUSE_MOVE',
      '@@kepler.gl/UPDATE_MAP',
      '@@kepler.gl/LAYER_HOVER'
    ]
  });
}


export default function configureStore(initialState) {
  const store = createStore(root, initialState, composeEnhancers(...enhancers));

  if (module.hot) {
    module.hot.accept('./reducers/root', () => {
      store.replaceReducer(require('./reducers/root').default);
    });
  }
  return store;
}
