import {
    Platform,
    DeviceEventEmitter
} from 'react-native';
import {
     START_RIDE, GPS_UPDATE_LOC, GPS_INIT_WATCH,
    UPDATE_TOTAL_DISTANCE
} from "../../actions/actionTypes";
import moment from "moment";
import * as userConfigRepository from "../../modules/storage/localStorage/userConfigRepository";
import * as geolocService from "../../modules/geoloc/geolocService";


export const startRide = () => {
    return (dispatch, getState) => {
        dispatch({
            type: START_RIDE,
            payload: getState().login.deviceId
        });
    }
}

export const checkLocationServicesIsEnabled = () => {
    return geolocService.checkLocationServicesIsEnabled(Platform.OS);
};

const dispatchNewPosition = function (position, dispatch) {
    // if (global.__DEV__) {
    //     console.log(geoPosition);
    // }
    dispatch({type: GPS_UPDATE_LOC, payload: position})
};

export const watchGPS = () => {
    return (dispatch) => {

        let watchId = geolocService.startGPS(Platform.OS);

        //check GPS every X milliseconds)
        let intervalId = geolocService.watchGPSPositionsAtInterval(dispatchNewPosition, dispatch);

        dispatch({
            type: GPS_INIT_WATCH,
            payload: {
                intervalId: intervalId,
                watchId: watchId,
                startTime: moment().valueOf(),
            }
        });
    }
};


export const updateTotalDistance = (rideDistance) => {
    return (dispatch) => {
        userConfigRepository.addToTotalDistanceAndSave(rideDistance)
            .then((totalDistance) => {
                dispatch({type: UPDATE_TOTAL_DISTANCE, payload: totalDistance});
            });
    }
};
