import send from './api';
import {
  login as loginApi,
  signout as signoutApi
} from '../../service/api/session';
import { RECEIVE_CURRENT_USER_ACCOUNT } from './account';
import { loadAppState, storeAppState } from '../../service/localstorage';



export const SESSION_REQUEST_GRANT = 'SESSION_REQUEST_GRANT';
export const SESSION_RECEIVE_TOKENS = 'SESSION_RECEIVE_TOKENS';
export const SESSION_AUTH_FAIL = 'SESSION_AUTH_FAIL';
export const SESSION_REQUEST_REAUTH = 'SESSION_REQUEST_REAUTH';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const FORCE_STOP_LOADING = 'FORCE_STOP_LOADING';

const authError = errors => dispatch => (
  dispatch({ type: SESSION_AUTH_FAIL, errors })
);


const login = (body, cb) => (dispatch, state) => {
  dispatch({ type: SESSION_REQUEST_GRANT })
  send(dispatch, state)(
    loginApi(body),
    (data) => {
      dispatch({ type: SESSION_RECEIVE_TOKENS });
      dispatch({ type: RECEIVE_CURRENT_USER_ACCOUNT, data });
      const oldState = loadAppState();
      storeAppState({
        ...oldState,
        session: {
          loading: false,
          authenticated: true,
          errors: undefined
        }
      });
    }, (error) => {
      dispatch(authError(error));
      cb(error);
    }
  );
};

const onSuccessLogout = () => (dispatch, state) => {
  dispatch({ type: LOGOUT_SUCCESS });
  const oldState = loadAppState();
  storeAppState({
    ...oldState,
    session: {
      loading: false,
      authenticated: false,
      errors: undefined
    }
  });
}

const signout = () => (dispatch, state) => {
  send(dispatch, state)(
    signoutApi(),
    () => {
      dispatch(onSuccessLogout())
    }
  );
}

export const SessionActions = {
  login,
  signout,
  onSuccessLogout
}