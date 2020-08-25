import send from "./api";
import {
    getAll as getAllApi,
    getState as getStateApi
} from '../../service/api/states';

export const GET_ALL_STATES = 'GET_ALL_STATES';

export const RECIEVE_ALL_STATES = 'RECIEVE_ALL_STATES';

export const GET_STATE = 'GET_ALL_STATE';

export const RECIEVE_STATE = 'RECIEVE_STATE';
export const RECIEVE_STATE_DISTRICTS = 'RECIEVE_STATE_DISTRICTS'


const getAll = () => (dispatch, state) => {
    dispatch({ type: GET_ALL_STATES })
    send(dispatch, state)(
        getAllApi(),
        (data) => {
            dispatch({ type: RECIEVE_ALL_STATES, data })
        }
    );
};

const getState = (id) => (dispatch, state) => {
    dispatch({ type: GET_STATE })
    send(dispatch, state)(
        getStateApi(id),
        (data) => {
            dispatch({ type: RECIEVE_STATE, data })
            dispatch({ type: RECIEVE_STATE_DISTRICTS, data })
        }
    );
};



export const StateActions = {
    getAll,
    getState
}