
import {
    Platform,
} from 'react-native';
import {PAUSE_RIDE, STOP_RIDE, RESTART_RIDE, ADD_RIDE,
    UPDATE_TOTAL_DISTANCE
} from "../../actions/actionTypes";
import * as totalDistanceRepository from "../../modules/localStorage/totalDistanceRepository";
import * as localRidesRepository from "../../modules/localStorage/localRidesRepository";
import * as geolocService from "../../modules/geolocService";

export const stopRide = () =>{
    return {type: STOP_RIDE}
}
export const pauseRide = () =>{
    return {type: PAUSE_RIDE}
}
export const restartRide = () =>{
    return {type: RESTART_RIDE}
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

function createTimeSpentByGaitAnalytics(positions) {
    let nbOfMeasures = positions.length;

    let analytics = positions.reduce((reduction,position)=>{
        let element = reduction.filter(analytics=>analytics["name"]===position.gait)[0];
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