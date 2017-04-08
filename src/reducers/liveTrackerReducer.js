import {
    START_RIDE, STOP_RIDE, PAUSE_RIDE, RESTART_RIDE, GPS_UPDATE_LOC,
    GPS_INIT_WATCH, UPDATE_TOTAL_DISTANCE, LOAD_TOTAL_DISTANCE
} from '../actions/actionTypes';
import moment from "moment";
import {GPS_TIME_INTERVAL} from "../config/config";

export const STATUS = {STOP: 0, START: 1, PAUSE: 2};

const initialState = {
    status: STATUS.STOP,
    totalDistance: 0,
    // ride:{
    //     date:null,
    //     geoIds: null,
    //     positions:[
    //         {
    //             longitude:0,
    //             latitude:0,
    //             timestamp:0,
    //             speed:0,
    //             gait:"",
    //         }
    //     ],
    //     analytics:{
    //         distance: 0,
    //         duration: 0,
    //         lastSpeed:0,
    //         avgSpeed:0,
    //         maxSpeed:0,
    //     },
    // },
};


export default (state = initialState, action = {}) => {
    switch (action.type) {
        case START_RIDE:
            return startRide(state);
        case STOP_RIDE:
            return stopRide(state);
        case UPDATE_TOTAL_DISTANCE:
            return updateTotalDistance(state, action.payload);
        case PAUSE_RIDE:
            return pauseRide(state);
        case RESTART_RIDE:
            return restartRide(state);

        // case START_GPS_WATCH:
        //     return startGpsWatch(state);
        case GPS_INIT_WATCH:
            return initWatch(state, action.payload);
        case GPS_UPDATE_LOC:
            return updateLocation(state, action.payload);
        default:
            return state;
    }
};

const startRide = (state) => {
    return {
        ...state,
        status: STATUS.START,
        ride: {
            date: moment().format(),
            geoIds: null,
            positions: [
                // {
                //     longitude:0,
                //     latitude:0,
                //     timestamp:0,
                //     speed:0,
                //     gait:"",
                // }
            ],
            analytics: {
                distance: 0,
                duration: 0,
                lastSpeed: 0,
                avgSpeed: 0,
                maxSpeed: 0,
            },
        },
    };
};

const stopRide = (state) => {
    return {
        ...state,
        status: STATUS.STOP,
    };
};

const pauseRide = (state) => {
    return {
        ...state,
        status: STATUS.PAUSE
    };
};

const restartRide = (state) => {
    return {
        ...state,
        status: STATUS.START,
    };
};

const initWatch = (state, geoIds) => {
    return {
        ...state,
        ride: {
            ...state.ride,
            geoIds:geoIds
        },
    };
};

const updateLocation = (state, newPosition) => {

    if (!state.ride.positions || state.ride.positions.length == 0) {
        return {
            ...state,
            ride: {
                ...state.ride,
                positions: [
                    ...state.ride.positions,
                    newPosition,
                ],
            },
        }
    }
    let lastPosition = state.ride.positions[state.ride.positions.length - 1];
    if (newPosition.timestamp - lastPosition.timestamp > GPS_TIME_INTERVAL + 5 * 1000) {
        return {
            ...state,
            ride: {
                ...state.ride,
                positions: [
                    ...state.ride.positions,
                    newPosition,
                ],
            },
        }
    }

    let from = {lat: lastPosition.latitude, lon: lastPosition.longitude};
    let to = {lat: newPosition.latitude, lon: newPosition.longitude};
    let distanceRidden = calculateDistance(from, to);
    let distance = state.ride.analytics.distance + distanceRidden;
    let totalDistance = state.totalDistance + distanceRidden;
    let duration = state.ride.analytics.duration + (newPosition.timestamp - lastPosition.timestamp) / 1000;
    let avgSpeed = distance / duration;


    let speed = state.ride.analytics.lastSpeed;
    let maxSpeed = state.ride.analytics.maxSpeed;
    if (newPosition.speed != undefined && newPosition.speed != "NaN") {
        speed = newPosition.speed;
        maxSpeed = speed > maxSpeed ? speed : maxSpeed
        ;
    }

    return {
        ...state,
        ride: {
            ...state.ride,
            analytics: {
                distance: distance,
                duration: duration,
                lastSpeed: speed,
                avgSpeed: avgSpeed,
                maxSpeed: maxSpeed,
            },
            positions: [
                ...state.ride.positions,
                newPosition,
            ]
        },
        totalDistance: totalDistance,
    };
};

export const updateTotalDistance= (state, totalDistance) =>{
    return {
        ...state,
        totalDistance: totalDistance,
    }
}


/**
 *
 var from = {lat: this.lastPosition.latitude, lon: this.lastPosition.longitude};
 var to = {lat: latitude, lon: longitude};
 this.distance += this.calculateDistance(from, to);
 * @param a
 * @param b
 */
export const calculateDistance = (a, b) => {

    // (mean) radius of Earth (meters)
    let R = 6378137;
    let PI_360 = Math.PI / 360;

    const cLat = Math.cos((a.lat + b.lat) * PI_360);
    const dLat = (b.lat - a.lat) * PI_360;
    const dLon = (b.lon - a.lon) * PI_360;

    const f = dLat * dLat + cLat * cLat * dLon * dLon;
    const c = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f));

    return R * c;
};
