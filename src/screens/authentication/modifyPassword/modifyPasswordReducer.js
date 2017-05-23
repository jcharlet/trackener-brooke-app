import {MODIFY_PASSWORD_ACTIONS} from "../../../actions/actionTypes";
const initialState = {
    // previousPassword: '',
    // password: '',
    // repeatPassword: '',
    feedback: '',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case MODIFY_PASSWORD_ACTIONS.SUCCESS:
        case MODIFY_PASSWORD_ACTIONS.ONGOING:
        case MODIFY_PASSWORD_ACTIONS.ERROR:
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
