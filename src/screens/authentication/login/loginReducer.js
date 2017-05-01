import {LOGIN_ERROR, LOGIN_SUCCESS} from "../../../actions/actionTypes";
import {checksum} from "../../../util/utils";
const initialState = {
    username: '',
    password: '',
    feedback: '',
    deviceId: '',
};


export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return updateLoginStateOnSuccess(state);
        case LOGIN_ERROR:
            return displayFeedback(state, action.payload);
        default:
            return state;
    }
};

export function updateLoginStateOnSuccess(state) {
    let deviceId=checksum(state.username);
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
