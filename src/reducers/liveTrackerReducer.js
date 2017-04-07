import {
    START_RIDE, STOP_RIDE, PAUSE_RIDE, RESTART_RIDE, GPS_UPDATE_LOC, GPS_INIT_LOC,
    GPS_INIT_WATCH
} from '../actions/actionTypes';
import {STATUS, TIMEOUT_GET, MAX_AGE, TIMEOUT_WATCH, DISTANCE_FILTER} from "../util/utils";
import moment from "moment";

const SPEED_THRESHOLD_STOP = 1;
const SPEED_THRESHOLD_WALK = 7;
const SPEED_THRESHOLD_TROT = 13;
const GAIT_STOP = "STOP";
const GAIT_WALK = "WALK";
const GAIT_TROT = "TROT";
const GAIT_CANTER = "CANTER";

const initialState = {
    status: STATUS.STOP,
    totalDistance: 0,
    // ride:{
    //     date:null,
    //     watchId: null,
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
        case PAUSE_RIDE:
            return pauseRide(state);
        case RESTART_RIDE:
            return restartRide(state);

        // case START_GPS_WATCH:
        //     return startGpsWatch(state);
        case GPS_INIT_WATCH:
            return initWatch(state, action.payload);
        case GPS_INIT_LOC:
            return initLocation(state, action.payload);
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
            watchId: null,
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

    clearWatchGps(state.ride.watchId);
    return {
        ...state,
        status: STATUS.STOP,
    };
};

const pauseRide = (state) => {
    clearWatchGps(state.ride.watchId);
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

const initWatch = (state, watchId) => {
    return {
        ...state,
        ride: {
            ...state.ride,
            watchId
        },
    };
};
let createPositionObjectFromGeoPosition = function (state, position) {
    let speed = undefined;
    let gait = undefined;
    if (position.coords.speed != undefined && position.coords.speed != "NaN") {
        speed = position.coords.speed;
        gait = getGaitFromSpeed(speed);
    }
    return {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        timestamp: position.timestamp,
        speed: speed,
        gait: gait,
    };
};
const initLocation = (state, position) => {
    let newPosition = createPositionObjectFromGeoPosition(state, position);

    return {
        ...state,
        ride: {
            ...state.ride,
            positions:[
                ...state.ride.positions,
                newPosition,
            ],
        },
    }
};

const updateLocation = (state, position) => {
    let newPosition = createPositionObjectFromGeoPosition(state, position);

    if (!state.ride.positions || state.ride.positions.length == 0) {
        return state;
    }
    let lastPosition = state.ride.positions[state.ride.positions.length - 1];
    if (lastPosition.timestamp - newPosition.timestamp > 10 * 1000) {
        return state;
    }

    let from = {lat: lastPosition.latitude, lon: lastPosition.longitude};
    let to = {lat: newPosition.latitude, lon: newPosition.longitude};
    let distanceRidden = calculateDistance(from, to);
    let distance = state.ride.analytics.distance + distanceRidden;
    let totalDistance = state.totalDistance + distanceRidden;
    let duration = state.ride.analytics.duration + (position.timestamp - lastPosition.timestamp) / 1000;
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
            analytics:{
                distance: distance,
                duration: duration,
                lastSpeed: speed,
                avgSpeed: avgSpeed,
                maxSpeed: maxSpeed,
            },
            positions:[
                ...state.ride.positions,
                newPosition,
            ]
        },
        totalDistance: totalDistance,
    };
};

export const watchGPS = () => {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition((position) => {
                dispatch({type: 'GPS_INIT_LOC', payload: position})
            }
            , (error) => {
            }
            , {
                enableHighAccuracy: true,
                timeout: TIMEOUT_GET,
                maximumAge: MAX_AGE
            }
        );

        let watchId = navigator.geolocation.watchPosition((position) => {
                dispatch({type: 'GPS_UPDATE_LOC', payload: position})
            }, (error) => {
            }
            , {
                enableHighAccuracy: true,
                timeout: TIMEOUT_WATCH,
                maximumAge: MAX_AGE,
                distanceFilter: DISTANCE_FILTER
            });

        dispatch({type: GPS_INIT_WATCH, payload: watchId});
    }
};
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

const clearWatchGps = (watchId) => {
    navigator.geolocation.clearWatch(watchId);
};

function getGaitFromSpeed(speed) {
    let gaitType;
    if (speed < SPEED_THRESHOLD_STOP) {
        gaitType = GAIT_STOP;
    } else if (speed < SPEED_THRESHOLD_WALK) {
        gaitType = GAIT_WALK;
    } else if (speed < SPEED_THRESHOLD_TROT) {
        gaitType = GAIT_TROT;
    } else {
        gaitType = GAIT_CANTER;
    }
    return gaitType;
}