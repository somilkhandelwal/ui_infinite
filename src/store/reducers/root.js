import { combineReducers } from 'redux';
import keplerGlReducer from 'kepler.gl/reducers';
import sessionReducer from './session';
import accountReducer from './account';
import { LOGOUT_SUCCESS } from '../actions/session';
import districtsReducer from './districts';
import statesReducer from './states';

const appReducer = combineReducers({
  session: sessionReducer,
  keplerGl: keplerGlReducer,
  account: accountReducer,
  districts: districtsReducer,
  states: statesReducer
});

// for reset, setting common reducer state to undefined
const root = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    return appReducer({}, action);
  }
  return appReducer(state, action);
};

export default root;
