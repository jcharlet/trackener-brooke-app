import {
    Platform,
    DeviceEventEmitter
} from 'react-native';
import {
    START_RIDE, GPS_INIT_WATCH,
    UPDATE_TOTAL_DISTANCE
} from "../../../actions/actionTypes";
import moment from "moment";
import * as geolocService from "../../../modules/geoloc/geolocService";
import * as storageService from "../../../modules/storage/storageService";
import * as appConfigRepository from "../../../modules/storage/localStorage/appConfigRepository";
import * as utils from "../../../util/utils";
import {POSITION_FIELDS} from "../../../modules/geoloc/geolocService";


export const startRide = (startDate) => {
    return (dispatch, getState) => {
        storageService.emptyCurrentRidePositions();
        dispatch({
            type: START_RIDE,
            payload: {
                deviceId: getState().login.deviceId,
                startDate: startDate
            }
        });
    }
}

export const checkLocationServicesIsEnabled = () => {
    return geolocService.checkLocationServicesIsEnabled(Platform.OS);
};

const saveNewPosition = function (position, rideId) {
    storageService.addPosition(position);
};

export const watchGPS = (startDate) => {
    return (dispatch) => {
        Promise.resolve(startDate)
            .then((startDate) => {
                if (!startDate) {
                    return storageService.getLastPosition()
                        .then((position) => {
                            if(position){
                                return position[POSITION_FIELDS.TIMESTAMP]
                            }
                            return startDate;
                        });
                }
                return startDate
            })
            .then((startDate) => {
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
                                rideId: rideId,
                            }
                        });
                    })
            })

    }

};