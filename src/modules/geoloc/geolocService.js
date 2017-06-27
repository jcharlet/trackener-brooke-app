import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import {
    GPS_TIME_INTERVAL,
    GPS_TIMEOUT_WATCH,
    GPS_MAX_AGE,
    GPS_DISTANCE_FILTER,
    GPS_TIMEOUT_GET,
    GPS_MIN_ACCURACY
} from "../../config/config";
import {
    Alert,
    Platform,
} from 'react-native';
import moment from "moment";
import BackgroundTimer from 'react-native-background-timer';
import * as utils from '../../util/utils'
import {RNLocation as Location} from 'NativeModules'
const Permissions = require('react-native-permissions');

import {
    DeviceEventEmitter
} from 'react-native';
import * as reportingService from "../reporting/reportingService";

// speed thresholds in mph
export const SPEED_THRESHOLD = {STOP: 1, WALK: 5.5, TROT: 9}
export const GAIT = {STOP: "STOP", WALK: "WALK", TROT: "TROT", CANTER: "CANTER"}
export const POSITION_FIELDS =
    {
        LONGITUDE: 0,
        LATITUDE: 1,
        TIMESTAMP: 2,
        SPEED: 3,
        GAIT: 4,
        ACCURACY: 5,
        EXTRA_DURATION: 6,
        EXTRA_DISTANCE: 7
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
        }).then(function(success) {
            return true;
        }).catch((error) => {
            return false;
        });
    } else {
      return Permissions.getPermissionStatus('location', 'always')
          .then(response => {
                if (response!='authorized') {
                  Alert.alert(
                    'Can we use your location always in background?',
                    'We need access so you can run the app in background',
                    [
                      {text: 'No way', onPress: () => console.log('permission denied'), style: 'cancel'},
                      response == 'undetermined'?
                        {text: 'OK', onPress: this._requestPermission.bind(this)}
                        : {text: 'Open Settings', onPress: Permissions.openSettings}
                    ]
                  )
                  return false;
                }else{
                  return true;
                }
          })
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


export const watchGPSPositionsAtInterval = function (saveNewPosition, dispatch, rideId) {
    let intervalId = BackgroundTimer.setInterval(() => {
        navigator.geolocation.getCurrentPosition((geoPosition) => {
                if (geoPosition.coords.accuracy <= GPS_MIN_ACCURACY) {
                    let position = createPositionArrayFromGeoPosition(geoPosition);
                    saveNewPosition(position, rideId);
                    //reportingService.logBreadcrumb("get current position", {x:geoPosition.coords.longitude, y:geoPosition.coords.latitude})
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
    if (geoPosition.coords.speed != undefined && !Number.isNaN(geoPosition.coords.speed)) {
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

export const getGaitFromSpeed = (speedKmh) => {
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


/**
 *
 var from = {lat: this.lastPosition[POSITION_FIELDS.LATITUDE], lon: this.lastPosition[POSITION_FIELDS.LONGITUDE]};
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
