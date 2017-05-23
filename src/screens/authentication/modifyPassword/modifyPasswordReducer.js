import {MODIFY_PASSWORD_FEEDBACK, MODIFY_PASSWORD_OUTCOME} from "./modifyPasswordActions";
const initialState = {
    // previousPassword: '',
    // password: '',
    // repeatPassword: '',
    feedback: '',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case MODIFY_PASSWORD_OUTCOME.SUCCESS:
            return displayFeedback(state, MODIFY_PASSWORD_FEEDBACK.SUCCESS);
        case MODIFY_PASSWORD_OUTCOME.ERROR:
            return displayFeedback(state, action.payload);
        default:
            return initialState;
    }
};

export function displayFeedback(state, feedback) {
    return {
        ...state,
        feedback: feedback
    }
}
