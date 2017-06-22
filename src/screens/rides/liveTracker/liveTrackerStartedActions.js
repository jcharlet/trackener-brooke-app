
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

export const stopRide = () =>{
    return {type: STOP_RIDE}
}
export const pauseRide = () =>{
    return {type: PAUSE_RIDE}
}
export const restartRide = () =>{
    return {type: RESTART_RIDE}
}

export const updateLocation = () =>{
    return (dispatch, getState) =>{
        let lastIndexProcessed = getState().liveTracker.ride.lastIndexProcessed;
        storageService.loadCurrentRidePositionsFromIndex(lastIndexProcessed)
            .then((positions)=>{
                dispatch({type: GPS_UPDATE_LOC,payload:positions})
            })
    }
}

export const clearWatchGps = () => {
    return (dispatch, getState) => {
        if(getState().liveTracker.ride.geoIds){
            let geoIds = getState().liveTracker.ride.geoIds;
            geolocService.clearWatchGps(Platform.OS,geoIds);
        }
    }
};

export const updateTotalDistance = (rideDistance) =>{
    return (dispatch)=>{
        storageService.addToTotalDistanceAndSave(rideDistance)
            .then((totalDistance) =>{
                dispatch({type: UPDATE_TOTAL_DISTANCE, payload: totalDistance});
            });
    }
};

export const addRide = () =>{
    return (dispatch,getState)=>{
        storageService.loadCurrentRidePositions()
            .then((positions)=>{
                let ride = getState().liveTracker.ride;
                let timeSpentByGait = createTimeSpentByGaitAnalytics(positions);
                ride = {
                    ...ride,
                    analytics:{
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

function createTimeSpentByGaitAnalytics(positions) {
    let nbOfMeasures = positions.length;

    let analytics = positions.reduce((reduction,position)=>{
        let element = reduction.filter(analytics=>analytics["name"]===position[POSITION_FIELDS.GAIT])[0];
        //if(position.duration){
        reduction[element["index"]]["number"]= reduction[element["index"]]["number"] + 1*100/nbOfMeasures;
        //}
        return reduction;
    }, [
        {"index":0, "number": 0, "name": geolocService.GAIT.STOP},
        {"index":1, "number": 0, "name": geolocService.GAIT.WALK},
        {"index":2, "number": 0, "name": geolocService.GAIT.TROT},
        {"index":3, "number": 0, "name": geolocService.GAIT.CANTER},
    ]);

    return analytics.map((analytic)=>{
        analytic["number"]=Math.round(analytic["number"]);
        return analytic
    })
}