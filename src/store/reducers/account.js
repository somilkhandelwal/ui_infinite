import {
  RECEIVE_CURRENT_USER_ACCOUNT, GET_CURRENT_USER_ACCOUNT
} from '../actions/account';

const accountReducer = (state = {
  currentUserDetails: null,
  loading: true
}, action) => {
  let newState;

  switch (action.type) {

    case GET_CURRENT_USER_ACCOUNT:
      newState = {
        ...state,
        loading: true
      };
      return newState;

    case RECEIVE_CURRENT_USER_ACCOUNT:
      newState = {
        ...state,
        currentUserDetails: {
          ...action.data.payload
        },
        loading: false
      };
      return newState;
    default:
      return state;
  }
};

export default accountReducer;
