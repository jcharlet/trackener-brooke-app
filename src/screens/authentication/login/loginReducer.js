import {LOGIN_ERROR, LOGIN_SUCCESS} from "../../../actions/actionTypes";
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

const checksum = function(s) {
    let hash = 0,
        strlen = s.length,
        i,
        c;
    if ( strlen === 0 ) {
        return hash;
    }
    for ( i = 0; i < strlen; i++ ) {
        c = s.charCodeAt( i );
        hash  = ((hash << 5) - hash) + c;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
