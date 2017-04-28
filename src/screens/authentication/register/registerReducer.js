import {REGISTER_ERROR, REGISTER_SUCCESS} from "../../../actions/actionTypes";
const initialState = {
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    feedback: '',
    deviceId: '',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return updateRegisterStateOnSuccess(state);
        case REGISTER_ERROR:
            return displayFeedback(state, action.payload);
        default:
            return state;
    }
};

export function updateRegisterStateOnSuccess(state) {
    return {
        ...state,
        feedback: ''
    }
}
export function displayFeedback(state, feedback) {
    return {
        ...state,
        feedback: feedback
    }
}
