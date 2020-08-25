import {
  GET_ALL_STATES,
  RECIEVE_ALL_STATES,
  GET_STATE,
  RECIEVE_STATE
} from '../actions/states';
import { RECIEVE_ALL_DISTRICTS_STATES } from '../actions/districts';

const statesReducer = (state = {
  currentState: null,
  currentStateLoading: true,
  states: null,
  loading: true
}, action) => {
  let newState;

  switch (action.type) {

    case GET_ALL_STATES:
      newState = {
        ...state,
        loading: true
      };
      return newState;

    case RECIEVE_ALL_STATES:
      newState = {
        ...state,
        states: [...state.states || [], ...action.data],
        loading: false
      };
      return newState;
    case GET_STATE:
      newState = {
        ...state,
        currentState: null,
        currentStateLoading: true
      };
      return newState;

    case RECIEVE_STATE:
      newState = {
        ...state,
        currentState: action.data.state.id,
        states: [...state.states || [], action.data.state],
        loading: false
      };
      return newState;
    case RECIEVE_ALL_DISTRICTS_STATES:
      newState = {
        ...state,
        states: [...state.states || [], ...action.data.states],
        loading: false
      };
      return newState;
    default:
      return state;
  }
};

export default statesReducer;
