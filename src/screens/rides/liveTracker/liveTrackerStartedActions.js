import {
    Platform,
} from 'react-native';
import {
    PAUSE_RIDE, STOP_RIDE, RESTART_RIDE, ADD_RIDE,
    UPDATE_TOTAL_DISTANCE, GPS_UPDATE_LOC
} from "../../../actions/actionTypes";
import * as geolocService from "../../../modules/geoloc/geolocService";
import * as storageService from "../../../modules/storage/storageService";
import {POSITION_FIELDS} from "../../../modules/geoloc/geolocService";
import {GPS_TIME_INTERVAL} from '../../../config/config'
export const stopRide = () => {
    return {type: STOP_RIDE}
}
export const pauseRide = () => {
    return {type: PAUSE_RIDE}
}
export const restartRide = () => {
    return {type: RESTART_RIDE}
}

export const updateLocation = () => {
    return (dispatch, getState) => {
        let lastIndexProcessed = getState().liveTracker.ride.lastIndexProcessed;
        storageService.loadCurrentRidePositionsFromIndex(lastIndexProcessed)
            .then((positions) => {
                dispatch({type: GPS_UPDATE_LOC, payload: positions})
            })
    }
}

export const clearWatchGps = () => {
    return (dispatch, getState) => {
        if (getState().liveTracker.ride.geoIds) {
            let geoIds = getState().liveTracker.ride.geoIds;
            geolocService.clearWatchGps(Platform.OS, geoIds);
        }
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

export const addRide = () => {
    return (dispatch, getState) => {
        storageService.loadCurrentRidePositions()
            .then((positions) => {
                let state = getState().liveTracker;
                let ride = state.ride;
                positions = updatePositionsOnDurationSpeedGait(positions, state.ride.restartTimes);
                let timeSpentByGait = createTimeSpentByGaitAnalytics(positions);
                ride = {
                    ...ride,
                    analytics: {
                        ...ride.analytics,
                        timeSpentByGait,
                    },
                };

                storageService.addRide(ride, positions);
                dispatch({type: ADD_RIDE, payload: ride});

                storageService.emptyCurrentRidePositions();
            })
    }
};

export function updatePositionsOnDurationSpeedGait(positions, restartTimes) {
    if(!positions || positions.length===0){
        return positions;
    }
    positions[0][POSITION_FIELDS.EXTRA_DISTANCE] = 0;
    positions[0][POSITION_FIELDS.EXTRA_DURATION] = 0;
    for (let i = 1; i < positions.length; i++) {
        let currentPosition = positions[i];
        let previousPosition = positions[i - 1];

        let happenedRightAfterAPause = false;
        if (restartTimes.length !== 0) {
            for (let i = 0; i < restartTimes.length; i++) {
                if (restartTimes[i] > previousPosition[POSITION_FIELDS.TIMESTAMP]
                    && restartTimes[i] < currentPosition[POSITION_FIELDS.TIMESTAMP]) {
                    happenedRightAfterAPause = true;
                }
            }
        }

        if (happenedRightAfterAPause) {
            currentPosition[POSITION_FIELDS.EXTRA_DISTANCE] = 0;
            currentPosition[POSITION_FIELDS.EXTRA_DURATION] = 0;
            positions[i]=currentPosition;
            continue;
        }

        let duration = (currentPosition[POSITION_FIELDS.TIMESTAMP] - previousPosition[POSITION_FIELDS.TIMESTAMP]) / 1000;
        currentPosition[POSITION_FIELDS.EXTRA_DURATION] = duration;

        let from = {lat: previousPosition[POSITION_FIELDS.LATITUDE], lon: previousPosition[POSITION_FIELDS.LONGITUDE]};
        let to = {lat: currentPosition[POSITION_FIELDS.LATITUDE], lon: currentPosition[POSITION_FIELDS.LONGITUDE]};
        let distanceSinceLastPos = geolocService.calculateDistance(from, to);
        currentPosition[POSITION_FIELDS.EXTRA_DISTANCE] = distanceSinceLastPos;

        //if we're a case out of norm (big duration between 2 sensors)
        if (duration > (GPS_TIME_INTERVAL * 2/1000)) {
            //then we're going to calculate speed and use deduced gait + duration to take that into analytics
            let speed = distanceSinceLastPos / duration;
            currentPosition[POSITION_FIELDS.SPEED] = speed;
            currentPosition[POSITION_FIELDS.GAIT] = geolocService.getGaitFromSpeed();
        }
        positions[i]=currentPosition;
    }
    return positions;

}
export function createTimeSpentByGaitAnalytics(positions) {
    let analytics = positions.reduce((reduction, position) => {
        let element = reduction.filter(analytics => analytics["name"] === position[POSITION_FIELDS.GAIT])[0];
        reduction[element["index"]]["number"] = reduction[element["index"]]["number"] + position[POSITION_FIELDS.EXTRA_DURATION];
        return reduction;
    }, [
        {"index": 0, "number": 0, "name": geolocService.GAIT.STOP},
        {"index": 1, "number": 0, "name": geolocService.GAIT.WALK},
        {"index": 2, "number": 0, "name": geolocService.GAIT.TROT},
        {"index": 3, "number": 0, "name": geolocService.GAIT.CANTER},
    ]);

    return analytics.map((analytic) => {
        analytic["number"] = Math.round(analytic["number"]);
        return analytic
    })
}
