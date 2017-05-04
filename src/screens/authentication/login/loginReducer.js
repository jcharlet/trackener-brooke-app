import {LOGIN_ERROR, LOGIN_SUCCESS, AUTO_LOGIN, LOGOUT, REGISTER_SUCCESS} from "../../../actions/actionTypes";
import {checksum} from "../../../util/utils";
import {loginOnStartup} from "./loginActions";
const initialState = {
    username: '',
    password: '',
    feedback: '',
    deviceId: '',
};


export default (state = initialState, action = {}) => {
    switch (action.type) {
        case AUTO_LOGIN:
            return autoLogin(state,action.payload);
        case LOGIN_SUCCESS:
            return updateLoginStateOnSuccess(state, action.payload);
        case LOGIN_ERROR:
            return displayFeedback(state, action.payload);
        case LOGOUT:
            return initState(state);
        case REGISTER_SUCCESS:
            return loginOnStartup();
        default:
            return state;
    }
};

export function autoLogin(state, credentials) {
    return {
        ...state,
        username:credentials.username,
        password:credentials.password,
    }
}
export function updateLoginStateOnSuccess(state, username) {
    let deviceId=checksum(username);
    return {
        ...state,
        deviceId:deviceId,
        feedback: ''
    }
}
export function displayFeedback(state, feedback) {
    return {
        ...state,
        feedback: feedback
    }
}

export const initState =() =>{
    return {
        username: '',
        password: '',
        feedback: '',
        deviceId: '',
    };
}
