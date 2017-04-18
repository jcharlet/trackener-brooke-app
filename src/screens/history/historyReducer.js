import {
    LOAD_RIDES_SUMMARY, ADD_RIDE, REMOVE_HACK
} from '../../actions/actionTypes';

const initialState = {
    rides:[],
    // index:1,
    index:undefined,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {

        case LOAD_RIDES_SUMMARY:
            return loadRides(state, action.payload);
        case ADD_RIDE:
            return addRide(state, action.payload);
        case REMOVE_HACK:
            return removeHack(state, action.payload);
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
};

const addRide = (state, ride) => {
    let historyRide = {
        ...ride.analytics,
        date:ride.date

    };
    return {
        ...state,
        rides:[
            ...state.rides,
            historyRide
        ],
        index:state.rides.length
    };
};

const removeHack = (state, date:string) =>{
    let rideArray = state.rides;
    let newRideArray = rideArray.filter(function (item) {
        return item.date !== date;
    });
    let indexOfElementToRemove = rideArray.map(function(x) {return x.date; }).indexOf(date);
    let newIndex = indexOfElementToRemove-1>=0?indexOfElementToRemove-1:0;
    return {
        ...state,
        rides:newRideArray,
        index:newIndex
    };
};