import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { enhanceReduxMiddleware } from 'kepler.gl/middleware';


import root from './reducers/root';


export const middlewares = enhanceReduxMiddleware([thunk]);

export const enhancers = [applyMiddleware(...middlewares)];


let composeEnhancers = compose;



export default function configureStore(initialState) {
  const store = createStore(root, initialState, composeEnhancers(...enhancers));
  return store;
}
