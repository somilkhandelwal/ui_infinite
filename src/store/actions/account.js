import send from "./api";
import { user as currentUserApi } from '../../service/api/account';

export const GET_CURRENT_USER_ACCOUNT = 'GET_CURRENT_USER_ACCOUNT';

export const RECEIVE_CURRENT_USER_ACCOUNT = 'RECEIVE_CURRENT_USER_ACCOUNT';


const fetchCurrentUser = (body) => (dispatch, state) => {
    dispatch({ type: GET_CURRENT_USER_ACCOUNT })
    send(dispatch, state)(
        currentUserApi(body),
        (data) => {
            dispatch({ type: RECEIVE_CURRENT_USER_ACCOUNT, data })
        }
    );
};



export const AccountActions = {
    fetchCurrentUser
}