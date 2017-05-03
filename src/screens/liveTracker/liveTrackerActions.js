
import {
    Platform,
    DeviceEventEmitter
} from 'react-native';
import {PAUSE_RIDE, START_RIDE, STOP_RIDE, RESTART_RIDE, GPS_UPDATE_LOC, GPS_INIT_WATCH, ADD_RIDE,
    UPDATE_TOTAL_DISTANCE
} from "../../actions/actionTypes";
import {GPS_TIME_INTERVAL, GPS_TIMEOUT_WATCH, GPS_MAX_AGE, GPS_DISTANCE_FILTER, GPS_TIMEOUT_GET, GPS_MIN_ACCURACY} from "../../config/config";
import moment from "moment";
import BackgroundTimer from 'react-native-background-timer';
import * as utils from '../../util/utils'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { RNLocation as Location } from 'NativeModules'
import * as totalDistanceRepository from "../../modules/localStorage/totalDistanceRepository";
import * as localRidesRepository from "../../modules/localStorage/localRidesRepository";

// speed thresholds in mph
export const SPEED_THRESHOLD = {STOP:1,WALK:7,TROT:13}
export const GAIT = {STOP:"STOP",WALK:"WALK",TROT:"TROT",CANTER:"CANTER"}

export const startRide = () =>{
    return (dispatch, getState) =>{
        dispatch({
            type: START_RIDE,
            payload: getState().login.deviceId
        });
    }
}

export const checkLocationServicesIsEnabled = () => {
    if(Platform.OS === 'android'){
        return LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location?</h2> \
                            This app wants to change your device settings:<br/><br/>\
                            - Use GPS for location<br/><br/>\
                            <p>Your location is used to track your position during a ride and get feedback (distance ridden, duration, speed, etc) in real time and afterwards.</p>",
            ok: "YES",
            cancel: "NO"
        })
    }else{
      //done by default on iOS
      Location.requestAlwaysAuthorization();
      return Promise.resolve();
    }
};

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


export const updateTotalDistance = (rideDistance) =>{
    return (dispatch)=>{
        totalDistanceRepository.addToTotalDistanceAndSave(rideDistance)
            .then((totalDistance) =>{
                dispatch({type: UPDATE_TOTAL_DISTANCE, payload: totalDistance});
            });
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