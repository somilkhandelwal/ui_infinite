import {
  GET_ALL_DISTRICTS,
  RECIEVE_ALL_DISTRICTS,
  GET_DISTRICT,
  RECIEVE_DISTRICT
} from '../actions/districts';
import { RECIEVE_STATE_DISTRICTS } from '../actions/states';

const districtsReducer = (state = {
  currentDistrict: null,
  currentDistrictLoading: true,
  districts: null,
  loading: true
}, action) => {
  let newState;

  switch (action.type) {

    case GET_ALL_DISTRICTS:
      newState = {
        ...state,
        loading: true
      };
      return newState;

    case RECIEVE_ALL_DISTRICTS:
      newState = {
        ...state,
        districts: [...state.districts || [], ...action.data.districts],
        loading: false
      };
      return newState;
    case GET_DISTRICT:
      newState = {
        ...state,
        currentDistrict: null,
        currentDistrictLoading: true
      };
      return newState;

    case RECIEVE_DISTRICT:
      newState = {
        ...state,
        currentDistrict: action.data.id,
        districts: [...state.districts || [], action.data],
        loading: false
      };
      return newState;
    case RECIEVE_STATE_DISTRICTS:
      newState = {
        ...state,
        districts: [...state.districts || [], ...action.data.districts],
        loading: false
      };
      return newState;
    default:
      return state;
  }
};

export default districtsReducer;
