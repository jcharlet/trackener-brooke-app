import {
    LOGOUT
} from '../../actions/actionTypes';

const initialState = {
    rides:[],
    // index:1,
    index:undefined,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state;
    }
};