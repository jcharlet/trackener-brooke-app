import {LOGIN_ERROR, LOGIN_SUCCESS} from "../../actions/actionTypes";
import {reinitLoginPage, displayFeedback} from "./loginActions";
const initialState = {
    username: '',
    password: '',
    feedback: '',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return reinitLoginPage(state);
        case LOGIN_ERROR:
            return displayFeedback(state, action.payload);
        default:
            return state;
    }
};