import {
    LOAD_SETTINGS,
    LOGOUT
} from '../../actions/actionTypes';

const initialState = {
    isOffline:false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD_SETTINGS:
            return loadSettings(state, action.payload);
        default:
            return state;
    }
};

function loadSettings(state, settings) {
return {
    ...state,
    isOffline:settings.isOffline
}
}