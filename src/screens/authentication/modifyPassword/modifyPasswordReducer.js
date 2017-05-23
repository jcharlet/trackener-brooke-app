import {MODIFY_PASSWORD_ERROR, MODIFY_PASSWORD_SUCCESS} from "../../../actions/actionTypes";
const initialState = {
    // previousPassword: '',
    // password: '',
    // repeatPassword: '',
    feedback: '',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case MODIFY_PASSWORD_SUCCESS:
            return updateRegisterStateOnSuccess(state);
        case MODIFY_PASSWORD_ERROR:
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
