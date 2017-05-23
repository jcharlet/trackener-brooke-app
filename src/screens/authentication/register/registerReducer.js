import {REGISTER_ERROR, REGISTER_ONGOING, REGISTER_SUCCESS} from "../../../actions/actionTypes";
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
        case REGISTER_ONGOING:
        case REGISTER_ERROR:
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
