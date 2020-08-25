
import apiCall from '../../service/api/apiCall';
import { SessionActions } from './session';

const send = (dispatch, state) => (spec, onSuccess, onFail) => {
  const localSpec = Object.assign({}, spec);
  apiCall(
    localSpec,
    data => onSuccess(data),
    (error, status) => {
      // bad request, like data validation error
      // nothing can be done but call fail
      if (onFail) {
        onFail(error)
      }
      dispatch(SessionActions.onSuccessLogout());
      return;
    }
  );
};

export default send;
