import {
    ADD_RIDE, SHOW_NEXT_HACK, SHOW_PREVIOUS_HACK, LOAD_RIDES
} from '../actions/actionTypes';
import moment from "../../node_modules/moment/moment";

const initialState = {
    rides:[],
    // index:1,
    index:undefined,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case ADD_RIDE:
            return addRide(state, action.payload);
        case LOAD_RIDES:
            return loadRides(state, action.payload);
        case SHOW_PREVIOUS_HACK:
            return showPreviousHack(state);
        case SHOW_NEXT_HACK:
            return showNextHack(state);
        default:
            return state;
    }
};

const loadRides = (state, payload) =>{
    let rides =payload || [];
    return {
        ...state,
        rides:rides,
        index:rides.length-1,
    }
}

const addRide = (state, ride) => {
    let index = state.index;
    if(index==undefined){
        index=0;
    }else{
        index +=1;
    }

    return {
        ...state,
        rides:[
            ...state.rides,
            ride
        ],
        index:index
    };
};

const showPreviousHack = (state) =>{
    return {
        ...state,
        index:state.index -1
    };
};

const showNextHack = (state) =>{
    return {
        ...state,
        index:state.index +1
    };
};
