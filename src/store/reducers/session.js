import INIT_STATE from './initialState';
import {
  SESSION_REQUEST_GRANT,
  SESSION_RECEIVE_TOKENS,
  SESSION_AUTH_FAIL,
  SESSION_REQUEST_REAUTH,
  FORCE_STOP_LOADING
} from '../actions/session';

const sessionReducer = (state = INIT_STATE.session, action) => {
  let newState;

  switch (action.type) {
    case SESSION_REQUEST_GRANT:
      newState = { ...state, loading: true, errors: {}, authenticated: false };
      return newState;
    case SESSION_RECEIVE_TOKENS:
      newState = {
        ...state,
        loading: false,
        authenticated: true,
        errors: undefined
      };
      return newState;
    case SESSION_AUTH_FAIL:
      newState = {
        ...state,
        loading: false,
        errors: { ...action.errors }
      };
      return newState;
    case SESSION_REQUEST_REAUTH:
      newState = {
        ...state,
        authenticated: false
      };
      return newState;
    case FORCE_STOP_LOADING:
      newState = {
        ...state,
        loading: false
      };
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
