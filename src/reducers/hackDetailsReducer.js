import {
    ADD_RIDE
} from '../actions/actionTypes';

const initialState = {
    rides:[
        // {
        //     date:0,
        //     startDate:0,
        //     distance: 0,
        //     duration: 0,
        //     avgSpeed: 0,
        //     maxSpeed: 0
        // }
    ],
};

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case ADD_RIDE:
            return addRide(state, action.payload);
        default:
            return state;
    }
};


const addRide = (state, ride) => {
    let rides =state.rides;
    rides.push(ride);
    return {
        ...state,
        rides
    };
};
