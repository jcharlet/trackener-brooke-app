import {
    START_RIDE, STOP_RIDE, PAUSE_RIDE, RESTART_RIDE, GPS_UPDATE_LOC, GPS_INIT_LOC,
    GPS_INIT_WATCH
} from '../actions/actionTypes';
import {STATUS, TIMEOUT_GET, MAX_AGE, TIMEOUT_WATCH, DISTANCE_FILTER, formatDate} from "../util/utils";

const initialState = {
    status: STATUS.STOP,
    date:null,
    initialPosition: undefined,
    lastPosition: undefined,
    watchId: null,
    distance: 0,
    totalDistance: 0,
    duration: 0,
    error: null,
    speed: 0,
    avgSpeed:0,
    maxSpeed:0,
    nbMeasures:0,
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
        date:formatDate(new Date()),
        distance: 0,
        duration: 0,
        initialPosition: undefined,
        lastPosition: undefined,
        error: null,
    };
};

const stopRide = (state) => {
    clearWatchGps(state.watchId);
    return {
        ...state,
        status: STATUS.STOP
    };
};

const pauseRide = (state) => {
    clearWatchGps(state.watchId);
    return {
        ...state,
        status: STATUS.PAUSE
    };
};

const restartRide = (state) => {
    return {
        ...state,
        status: STATUS.START,
        initialPosition: undefined,
        lastPosition: undefined,
    };
};

const initWatch = (state, watchId) => {
    return {
        ...state,
        watchId: watchId
    };
};
const initLocation = (state, position) => {
    return {
        ...state,
        initialPosition: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            timestamp: position.timestamp
        },
        lastPosition: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            timestamp: position.timestamp
        },
        speed: position.coords.speed,
        nbMeasures:1,
    }
};

const updateLocation = (state, position) => {
    if (state.lastPosition == undefined) {
        return state;
    }

    let from = {lat: state.lastPosition.latitude, lon: state.lastPosition.longitude};
    let to = {lat: position.coords.latitude, lon: position.coords.longitude};
    let distanceRidden = calculateDistance(from, to);
    let distance = state.distance + distanceRidden;
    let totalDistance = state.totalDistance + distanceRidden;
    let duration = state.duration + (position.timestamp - state.lastPosition.timestamp) / 1000;
    let nbMeasures = state.nbMeasures+1;
    let avgSpeed = (state.avgSpeed * (nbMeasures-1) + position.speed)/nbMeasures;
    let maxSpeed = position.speed>state.maxSpeed?position.speed:state.maxSpeed;
    return {
        ...state,
        lastPosition: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            timestamp: position.timestamp
        },
        distance: distance,
        totalDistance: totalDistance,
        duration: duration,
        speed: position.coords.speed,
        nbMeasures: nbMeasures,
        avgSpeed: avgSpeed,
        maxSpeed: maxSpeed,
    };
};


// export function stopAfterFiveSeconds() {
//     return (dispatch) => {
//         setTimeout(() => {
//             dispatch({type: STOP_RIDE});
//         }, 2000);
//     };
// }

// export function startGpsWatch(state) {
//     return (dispatch) => {
//         let watchId = watchGPS(state);
//         dispatch({type: GPS_INIT_WATCH, payload: watchId});
//         // return initWatch(state,watchId);
//     }
// }

export const watchGPS = () => {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition((position) => {
                // initLocation(state,position);
                // return (dispatch) => {
                dispatch({type: 'GPS_INIT_LOC', payload: position})
                // };
            }
            , (error) => {
            }
            // , (error) => this.setState(
            //     {
            //         error: {
            //             message: error.message,
            //             source: 'getCurrentPosition',
            //         }
            //     }
            // )
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
            // }, (error) => this.setState(
            // {
            //     error: {
            //         message: error.message,
            //         source: 'watchPosition',
            //     }
            // }
            // )
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
