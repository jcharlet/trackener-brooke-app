import {
    ADD_RIDE, SHOW_NEXT_HACK, SHOW_PREVIOUS_HACK
} from '../actions/actionTypes';
import moment from "../../node_modules/moment/moment";

const initialState = {
    rides:[],
    // index:1,
    index:0,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case ADD_RIDE:
            return addRide(state, action.payload);
            return state;
        case SHOW_PREVIOUS_HACK:
            return showPreviousHack(state);
        case SHOW_NEXT_HACK:
            return showNextHack(state);
        default:
            return state;
    }
};


const addRide = (state, ride) => {
    let rides =state.rides;
    rides.push(ride);
    let index = rides.length-1;
    return {
        ...state,
        rides,
        index
    };
};

const showPreviousHack = (state) =>{
    let index = state.index -1;
    return {
        ...state,
        index
    };
};

const showNextHack = (state) =>{
    let index = state.index +1;
    return {
        ...state,
        index
    };
};
