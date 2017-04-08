
import {
    AsyncStorage
} from 'react-native';
import {PAUSE_RIDE, START_RIDE, STOP_RIDE, RESTART_RIDE, GPS_UPDATE_LOC, GPS_INIT_WATCH, ADD_RIDE,
    UPDATE_TOTAL_DISTANCE, LOAD_TOTAL_DISTANCE
} from "./actionTypes";
import {GPS_TIME_INTERVAL, GPS_TIMEOUT_WATCH, GPS_MAX_AGE, GPS_DISTANCE_FILTER, GPS_TIMEOUT_GET} from "../config/config";
import moment from "moment";

export const SPEED_THRESHOLD = {STOP:1,WALK:7,TROT:13}
export const GAIT = {STOP:"STOP",WALK:"WALK",TROT:"TROT",CANTER:"CANTER"}

export const stopRide = () =>{
    return {type: STOP_RIDE}
}
export const startRide = () =>{
    return {type: START_RIDE}
}
export const pauseRide = () =>{
    return {type: PAUSE_RIDE}
}
export const restartRide = () =>{
    return {type: RESTART_RIDE}
}


export const watchGPS = (time = GPS_TIME_INTERVAL) => {
    return (dispatch) => {

        //start the GPS into full time watching. Drains battery but brings best accuracy (required for our needs)
        let watchId = navigator.geolocation.watchPosition((position) => {
                // if (global.__DEV__) {
                //     console.log(position);
                // }
            }
            , (error) => {
                console.log(error);
            }
            , {
                enableHighAccuracy: true,
                timeout: GPS_TIMEOUT_WATCH,
                maximumAge: GPS_MAX_AGE,
                distanceFilter: GPS_DISTANCE_FILTER
            });

        //check GPS every X milliseconds)
        let intervalId = setInterval(() => {
            navigator.geolocation.getCurrentPosition((geoPosition) => {
                    if (geoPosition.coords.accuracy < 21) {

                        let position = createPositionObjectFromGeoPosition(geoPosition);
                        dispatch({type: GPS_UPDATE_LOC, payload: position})
                    }
                }
                , (error) => {
                    console.log(error);
                }
                , {
                    enableHighAccuracy: true,
                    timeout: GPS_TIMEOUT_GET,
                    maximumAge: GPS_MAX_AGE
                });
        }, time);

        dispatch({type: GPS_INIT_WATCH, payload: {intervalId:intervalId,watchId:watchId}});
    }
};


export const clearWatchGps = () => {
    return (dispatch, getState) => {
        let geoIds = getState().liveTracker.ride.geoIds;
        navigator.geolocation.clearWatch(geoIds.watchId);
        clearInterval(geoIds.intervalId);
    }
};

export const loadTotalDistance = () => ({
    type: UPDATE_TOTAL_DISTANCE,
    payload: AsyncStorage.getItem('totalDistance').then((totalDistance) => {
        if (totalDistance && !isNaN(totalDistance)) {
            return Number(totalDistance);
        }
        return 0;
    })
});

export const updateTotalDistance = (rideDistance) =>{
    return (dispatch)=>{
        AsyncStorage.getItem('totalDistance').then((totalDistanceString) => {
            let totalDistance=0;
            if (totalDistanceString && !isNaN(totalDistanceString)) {
                totalDistance=Number(totalDistanceString);
            }
            totalDistance+=rideDistance;
            AsyncStorage.setItem('totalDistance', totalDistance.toString());
            dispatch({type: UPDATE_TOTAL_DISTANCE, payload: totalDistance});
        });
    }
}

export const addRide = (ride) =>{
    AsyncStorage.getItem('rides').then((rides) => {
        if (rides) {
            const rideArray = JSON.parse(rides);
            return AsyncStorage.setItem('rides', JSON.stringify([...rideArray, ride]));
        }
        return AsyncStorage.setItem('rides', JSON.stringify([ride]));
    });
    return ({type: ADD_RIDE, payload: ride});
};


let createPositionObjectFromGeoPosition = function (position) {
    let speed = undefined;
    let gait = undefined;
    if (position.coords.speed != undefined && position.coords.speed != "NaN") {
        speed = position.coords.speed;
        gait = getGaitFromSpeed(speed);
    }
    return {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        timestamp: moment().valueOf(),
        speed: speed,
        gait: gait,
    };
};

function getGaitFromSpeed(speed) {
    let gaitType;
    if (speed < SPEED_THRESHOLD.STOP) {
        gaitType = GAIT.STOP;
    } else if (speed < SPEED_THRESHOLD.WALK) {
        gaitType = GAIT.WALK;
    } else if (speed < SPEED_THRESHOLD.TROT) {
        gaitType = GAIT.TROT;
    } else {
        gaitType = GAIT.CANTER;
    }
    return gaitType;
}