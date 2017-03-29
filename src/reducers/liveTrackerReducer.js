import { createStore } from 'redux';
import { START_RIDE, STOP_RIDE, PAUSE_RIDE, RESTART_RIDE } from '../actions/actionTypes';
import {STATUS} from "../util/utils";


const initialState = {
    status: STATUS.STOP,
    initialPosition: undefined,
    lastPosition: undefined,
    watchID: null,
    enableHighAccuracy: true,
    distance: 0,
    totalDistance: 0,
    duration: 0,
    error: null,
    speed: 0
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case START_RIDE:
            return startTracking(state);
        case STOP_RIDE:
            return stopTracking(state);
        case PAUSE_RIDE:
            return pauseTracking(state);
        case RESTART_RIDE:
            return restartTracking(state);
        default:
            return state;
    }
};
// export default createStore(liveTrackerReducer);

const startTracking = (state) => {
    watchGPS(state);
    return {
        ...state,
        status: STATUS.START,
        distance: 0,
        duration: 0,
        initialPosition: undefined,
        lastPosition: undefined,
        error: null
    };
};

const stopTracking = (state) => {
    clearWatchGps(state.watchID);
    return {
        ...state,
        status: STATUS.STOP
    };
};

const pauseTracking = (state) => {
    clearWatchGps(state.watchID);
    return {
        ...state,
      status: STATUS.PAUSE
    };
};

const restartTracking = (state) => {
    watchGPS(state);
    return {
        ...state,
        status: STATUS.START,
        initialPosition: undefined,
        lastPosition: undefined
    };
};


const watchGPS = (state) => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //         this.setState({
    //             initialPosition: {
    //                 longitude: position.coords.longitude,
    //                 latitude: position.coords.latitude,
    //                 timestamp: position.timestamp
    //             },
    //             lastPosition: {
    //                 longitude: position.coords.longitude,
    //                 latitude: position.coords.latitude,
    //                 timestamp: position.timestamp
    //             },
    //             speed: position.coords.speed,
    //         });
    //     }
    //     , (error) => this.setState(
    //         {
    //             error: {
    //                 message: error.message,
    //                 source: 'getCurrentPosition',
    //             }
    //         }
    //     )
    //     , {
    //         enableHighAccuracy: state.enableHighAccuracy,
    //         timeout: TIMEOUT_GET,
    //         maximumAge: MAX_AGE
    //     }
    // );

    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //         if (this.state.lastPosition == undefined) {
    //             return;
    //         }
    //
    //         let from = {lat: this.state.lastPosition.latitude, lon: this.state.lastPosition.longitude};
    //         let to = {lat: position.coords.latitude, lon: position.coords.longitude};
    //         let distanceRidden = calculateDistance(from, to);
    //         this.state.distance += distanceRidden;
    //         this.state.totalDistance += distanceRidden;
    //         this.state.duration += (position.timestamp - this.state.lastPosition.timestamp) / 1000;
    //         this.setState({
    //             lastPosition: {
    //                 longitude: position.coords.longitude,
    //                 latitude: position.coords.latitude,
    //                 timestamp: position.timestamp
    //             },
    //             distance: this.state.distance,
    //             speed: position.coords.speed,
    //         });
    //     }, (error) => this.setState(
    //     {
    //         error: {
    //             message: error.message,
    //             source: 'watchPosition',
    //         }
    //     }
    //     )
    //
    //     , {
    //         enableHighAccuracy: state.enableHighAccuracy,
    //         timeout: TIMEOUT_WATCH,
    //         maximumAge: MAX_AGE,
    //         distanceFilter: DISTANCE_FILTER
    //     });
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

const clearWatchGps = (watchID) => {
    // navigator.geolocation.clearWatch(watchID);
};
