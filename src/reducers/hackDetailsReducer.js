import {
    ADD_RIDE, SHOW_NEXT_HACK, SHOW_PREVIOUS_HACK
} from '../actions/actionTypes';
import moment from "../../node_modules/moment/moment";

const initialState = {
    rides:[
        // {
        //     date:moment("20170330").valueOf(),
        //     distance: 456.564987,
        //     duration: 78,
        //     avgSpeed: 11.5,
        //     maxSpeed: 24.54
        // },
        // {
        //     date:moment().valueOf(),
        //     distance: 19856.564987,
        //     duration: 265,
        //     avgSpeed: 12.2132,
        //     maxSpeed: 25.5648
        // },
    ],
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
