import send from "./api";
import {
    getAll as getAllApi,
    getDestrict as getDestrictApi
} from '../../service/api/districts';

export const GET_ALL_DISTRICTS = 'GET_ALL_DISTRICTS';

export const RECIEVE_ALL_DISTRICTS = 'RECIEVE_ALL_DISTRICTS';

export const GET_DISTRICT = 'GET_ALL_DISTRICT';

export const RECIEVE_DISTRICT = 'RECIEVE_DISTRICT';

export const RECIEVE_ALL_DISTRICTS_STATES = 'RECIEVE_ALL_DISTRICTS_STATES';



const getAll = (callback) => (dispatch, state) => {
    dispatch({ type: GET_ALL_DISTRICTS })
    send(dispatch, state)(
        getAllApi(),
        (data) => {
            dispatch({ type: RECIEVE_ALL_DISTRICTS, data })
            dispatch({ type: RECIEVE_ALL_DISTRICTS_STATES, data })
            if (callback) callback(data);
        }
    );
};

const getDestrict = (id) => (dispatch, state) => {
    dispatch({ type: GET_DISTRICT })
    send(dispatch, state)(
        getDestrictApi(id),
        (data) => {
            dispatch({ type: RECIEVE_DISTRICT, data })
        }
    );
};



export const DistrictActions = {
    getAll,
    getDestrict
}