import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import {
    GPS_TIME_INTERVAL,
    GPS_TIMEOUT_WATCH,
    GPS_MAX_AGE,
    GPS_DISTANCE_FILTER,
    GPS_TIMEOUT_GET,
    GPS_MIN_ACCURACY
} from "../../config/config";
import moment from "moment";
import BackgroundTimer from 'react-native-background-timer';
import * as utils from '../../util/utils'
import {RNLocation as Location} from 'NativeModules'

import {
    DeviceEventEmitter
} from 'react-native';

// speed thresholds in mph
export const SPEED_THRESHOLD = {STOP: 1, WALK: 7, TROT: 13}
export const GAIT = {STOP: "STOP", WALK: "WALK", TROT: "TROT", CANTER: "CANTER"}
export const POSITION_FIELDS =
    {
        LONGITUDE: 0,
        LATITUDE: 1,
        TIMESTAMP: 2,
        SPEED: 3,
        GAIT: 4,
        ACCURACY: 5
    };

export const checkLocationServicesIsEnabled = (platform: string) => {
    if (platform === 'android') {
        return LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location?</h2> \
                            This app wants to change your device settings:<br/><br/>\
                            - Use GPS for location<br/><br/>\
                            <p>Your location is used to track your position during a ride and get feedback (distance ridden, duration, speed, etc) in real time and afterwards.</p>",
            ok: "YES",
            cancel: "NO"
        })
    } else {
        Location.requestAlwaysAuthorization();
        return Promise.resolve();
    }
};

export const startGPS = (platform: string) => {
    if (platform === 'android') {
        //start the GPS into full time watching. Drains battery but brings best accuracy (required for our needs)
        return navigator.geolocation.watchPosition((position) => {
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
    } else {
        Location.requestAlwaysAuthorization();
        Location.startUpdatingLocation();
        Location.setDistanceFilter(0);
        //Location.setDesiredAccuracy(distanceInMeters);

        var subscription = DeviceEventEmitter.addListener(
            'locationUpdated',
            (location) => {
            }
        );
        return;
    }
}


export const clearWatchGps = function (platform, geoIds) {
    if (platform === 'android') {
        navigator.geolocation.clearWatch(geoIds.watchId);
    } else {
        Location.stopUpdatingLocation();
    }
    BackgroundTimer.clearInterval(geoIds.intervalId);
}


export const watchGPSPositionsAtInterval = function (dispatchNewPositionFunction, dispatch) {
    let intervalId = BackgroundTimer.setInterval(() => {
        navigator.geolocation.getCurrentPosition((geoPosition) => {
                if (geoPosition.coords.accuracy <= GPS_MIN_ACCURACY) {
                    let position = createPositionArrayFromGeoPosition(geoPosition);
                    dispatchNewPositionFunction(position, dispatch);
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
    }, GPS_TIME_INTERVAL);
    return intervalId;
};



const createPositionArrayFromGeoPosition = function (geoPosition) {
    let speed = undefined;
    let gait = undefined;
    if (geoPosition.coords.speed != undefined && geoPosition.coords.speed != "NaN") {
        speed = geoPosition.coords.speed;
        gait = getGaitFromSpeed(speed);
    }
    return [
        geoPosition.coords.longitude,
        geoPosition.coords.latitude,
        moment().valueOf(),
        speed,
        gait,
        geoPosition.coords.accuracy,
    ];
};

const getGaitFromSpeed = (speedKmh) => {
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
