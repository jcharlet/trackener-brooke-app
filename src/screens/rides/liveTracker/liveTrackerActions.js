import {
    Platform,
    DeviceEventEmitter
} from 'react-native';
import {
    START_RIDE, GPS_UPDATE_LOC, GPS_INIT_WATCH,
    UPDATE_TOTAL_DISTANCE, GPS_ADD_LOC
} from "../../../actions/actionTypes";
import moment from "moment";
import * as geolocService from "../../../modules/geoloc/geolocService";
import * as storageService from "../../../modules/storage/storageService";
import * as appConfigRepository from "../../../modules/storage/localStorage/appConfigRepository";
import * as utils from "../../../util/utils";
import * as localRidesPositionsRepositoryRDB from "../../../modules/storage/localStorage/localRidePositionsRepositoryRDB";


export const startRide = (startDate) => {
    return (dispatch, getState) => {
        dispatch({
            type: START_RIDE,
            payload: {
                deviceId:getState().login.deviceId,
                startDate:startDate
            }
        });
    }
}

export const checkLocationServicesIsEnabled = () => {
    return geolocService.checkLocationServicesIsEnabled(Platform.OS);
};

const saveNewPosition = function (position, dispatch, rideId) {
    // if (global.__DEV__) {
    //     console.log(geoPosition);
    // }
    // dispatch({type: GPS_ADD_LOC, payload: position})
    localRidesPositionsRepositoryRDB.addPosition(position,rideId);
};

export const watchGPS = (startDate) => {
    if(!startDate){
        startDate=localRidesPositionsRepositoryRDB.getLastPosition().date;
    }
    return (dispatch) => {
        return appConfigRepository.load()
            .then((appConfig) => {
                let rideId = utils.createRideId(appConfig.username, appConfig.deviceId, startDate);
                let watchId = geolocService.startGPS(Platform.OS);

                //check GPS every X milliseconds)
                let intervalId = geolocService.watchGPSPositionsAtInterval(saveNewPosition, dispatch, rideId);

                dispatch({
                    type: GPS_INIT_WATCH,
                    payload: {
                        intervalId: intervalId,
                        watchId: watchId,
                        startTime: moment().valueOf(),
                    }
                });
            })
    }
};


export const updateTotalDistance = (rideDistance) => {
    return (dispatch) => {
        storageService.addToTotalDistanceAndSave(rideDistance)
            .then((totalDistance) => {
                dispatch({type: UPDATE_TOTAL_DISTANCE, payload: totalDistance});
            });
    }
};
