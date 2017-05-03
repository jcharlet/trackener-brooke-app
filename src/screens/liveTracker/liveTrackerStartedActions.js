
import {
    Platform,
    DeviceEventEmitter
} from 'react-native';
import {PAUSE_RIDE, STOP_RIDE, RESTART_RIDE, GPS_UPDATE_LOC, GPS_INIT_WATCH, ADD_RIDE,
    UPDATE_TOTAL_DISTANCE
} from "../../actions/actionTypes";
import {GPS_TIME_INTERVAL, GPS_TIMEOUT_WATCH, GPS_MAX_AGE, GPS_DISTANCE_FILTER, GPS_TIMEOUT_GET, GPS_MIN_ACCURACY} from "../../config/config";
import moment from "moment";
import BackgroundTimer from 'react-native-background-timer';
import * as utils from '../../util/utils'
import { RNLocation as Location } from 'NativeModules'
import * as totalDistanceRepository from "../../modules/localStorage/totalDistanceRepository";
import * as localRidesRepository from "../../modules/localStorage/localRidesRepository";

// speed thresholds in mph
export const SPEED_THRESHOLD = {STOP:1,WALK:7,TROT:13}
export const GAIT = {STOP:"STOP",WALK:"WALK",TROT:"TROT",CANTER:"CANTER"}

export const stopRide = () =>{
    return {type: STOP_RIDE}
}
export const pauseRide = () =>{
    return {type: PAUSE_RIDE}
}
export const restartRide = () =>{
    return {type: RESTART_RIDE}
}

export const watchGPS = (time = GPS_TIME_INTERVAL) => {
    return (dispatch) => {
        let watchId=null;
        if(Platform.OS === 'android'){
          //start the GPS into full time watching. Drains battery but brings best accuracy (required for our needs)
          watchId = navigator.geolocation.watchPosition((position) => {
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
          } else{
            Location.requestAlwaysAuthorization();
            Location.startUpdatingLocation();
            Location.setDistanceFilter(0);
            //Location.setDesiredAccuracy(distanceInMeters);

            var subscription = DeviceEventEmitter.addListener(
                'locationUpdated',
                (location) => {
                }
            );
          }
        //check GPS every X milliseconds)
        let intervalId = BackgroundTimer.setInterval(() => {
            navigator.geolocation.getCurrentPosition((geoPosition) => {
              // if (global.__DEV__) {
              //     console.log(geoPosition);
              // }
                    if (geoPosition.coords.accuracy <= GPS_MIN_ACCURACY) {
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

        dispatch({
            type: GPS_INIT_WATCH,
            payload: {
                intervalId:intervalId,
                watchId:watchId,
                startTime:moment().valueOf(),
            }
        });
    }
};


export const clearWatchGps = () => {
    return (dispatch, getState) => {
        if(getState().liveTracker.ride.geoIds){
            let geoIds = getState().liveTracker.ride.geoIds;
            if(Platform.OS === 'android'){
              navigator.geolocation.clearWatch(geoIds.watchId);
            }else {
              Location.stopUpdatingLocation();
            }
            BackgroundTimer.clearInterval(geoIds.intervalId);
        }
    }
};

export const updateTotalDistance = (rideDistance) =>{
    return (dispatch)=>{
        totalDistanceRepository.addToTotalDistanceAndSave(rideDistance)
            .then((totalDistance) =>{
                dispatch({type: UPDATE_TOTAL_DISTANCE, payload: totalDistance});
            });
    }
};

export const addRide = () =>{
    return (dispatch,getState)=>{
        let ride = getState().liveTracker.ride;
        let timeSpentByGait = createTimeSpentByGaitAnalytics(ride.positions);
        ride = {
            ...ride,
            analytics:{
                ...ride.analytics,
                timeSpentByGait,
            }
        };

        localRidesRepository.addRide(ride);
        dispatch({type: ADD_RIDE, payload: ride});
    }
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
        accuracy: position.coords.accuracy,
    };
};

function getGaitFromSpeed(speedKmh) {
  let speed = utils.convertMeterPerSecondToMilesPerHour(speedKmh);
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

function createTimeSpentByGaitAnalytics(positions) {
    let nbOfMeasures = positions.length;

    let analytics = positions.reduce((reduction,position)=>{
        let element = reduction.filter(analytics=>analytics["name"]===position.gait)[0];
        //if(position.duration){
        reduction[element["index"]]["number"]= reduction[element["index"]]["number"] + 1*100/nbOfMeasures;
        //}
        return reduction;
    }, [
        {"index":0, "number": 0, "name": GAIT.STOP},
        {"index":1, "number": 0, "name": GAIT.WALK},
        {"index":2, "number": 0, "name": GAIT.TROT},
        {"index":3, "number": 0, "name": GAIT.CANTER},
    ]);

    return analytics.map((analytic)=>{
        analytic["number"]=Math.round(analytic["number"]);
        return analytic
    })
}