import {
    START_RIDE, STOP_RIDE, PAUSE_RIDE, RESTART_RIDE, GPS_UPDATE_LOC, GPS_ADD_LOC,
    GPS_INIT_WATCH, UPDATE_TOTAL_DISTANCE
} from '../../../actions/actionTypes';
import moment from "moment";
import {GPS_TIME_INTERVAL} from "../../../config/config";
import {POSITION_FIELDS} from "../../../modules/geoloc/geolocService";
import * as localRidesPositionsRepositoryRDB from "../../../modules/storage/localStorage/localRidePositionsRepositoryRDB";

export const STATUS = {STOP: 0, START: 1, PAUSE: 2};

const initialState = {
    status: STATUS.STOP,
    totalDistance: 0,
    // ride:{
    //     date:null,
    //     geoIds: null,
    //     positions:[
    //         {
    //             longitude:0,
    //             latitude:0,
    //             timestamp:0,
    //             speed:0,
    //             gait:"",
    //         }
    //     ],
    //     analytics:{
    //         distance: 0,
    //         duration: 0,
    //         lastSpeed:0,
    //         avgSpeed:0,
    //         maxSpeed:0,
    //     },
    //      deviceId:''
    // },
};


export default (state = initialState, action = {}) => {
    switch (action.type) {
        case START_RIDE:
            return startRide(state, action.payload);
        case STOP_RIDE:
            return stopRide(state);
        case UPDATE_TOTAL_DISTANCE:
            return updateTotalDistance(state, action.payload);
        case PAUSE_RIDE:
            return pauseRide(state);
        case RESTART_RIDE:
            return restartRide(state);

        // case START_GPS_WATCH:
        //     return startGpsWatch(state);
        case GPS_INIT_WATCH:
            return initWatch(state, action.payload);
        // case GPS_ADD_LOC:
        //     return addLocation(state, action.payload);
        case GPS_UPDATE_LOC:
            return updateLocation(state);
        default:
            return state;
    }
};

const startRide = (state, startContainer) => {
    return {
        ...state,
        status: STATUS.START,
        ride: {
            date: startContainer.startDate,
            deviceId: startContainer.deviceId,
            geoIds: null,
            pastDuration: 0,
            positions: [],
            analytics: {
                distance: 0,
                duration: 0,
                lastSpeed: 0,
                avgSpeed: 0,
                maxSpeed: 0,
            },
            lastIndexProcessed:0,
        },
    };
};

const stopRide = (state) => {
    let ride = updateRideAnalytics(state.ride);
    return {
        ...state,
        status: STATUS.STOP,
        ride: ride
    };
};

const pauseRide = (state) => {
    let ride = updateRideAnalytics(state.ride)
    return {
        ...state,
        ride: {
            ...ride,
            geoIds: null,
        },
        status: STATUS.PAUSE
    };
};

const restartRide = (state) => {
    return {
        ...state,
        status: STATUS.START,
    };
};

const initWatch = (state, geoIds) => {
    return {
        ...state,
        ride: {
            ...state.ride,
            geoIds: geoIds
        },
    };
};

// const addLocation = (state, newPosition) => {
//     if (!state.ride.geoIds) {
//         return state;
//     }
//
//     if(state.ride.positions.length>=1){
//         let lastPosition = state.ride.positions[state.ride.positions.length - 1];
//         if (newPosition[POSITION_FIELDS.TIMESTAMP] - lastPosition[POSITION_FIELDS.TIMESTAMP] < GPS_TIME_INTERVAL) {
//             return state;
//         }
//     }
//
//     return {
//         ...state,
//         ride: {
//             ...state.ride,
//             positions: [
//                 ...state.ride.positions,
//                 newPosition,
//             ],
//         },
//     }
// }

export const updateLocation = (state) => {

    let positions = localRidesPositionsRepositoryRDB.loadById(state.ride.geoIds.rideId)
    if(positions.length===0 || positions.length<2 || state.ride.lastIndexProcessed === positions.length-1){
        return state;
    }

    let lastIndexProcessed=state.ride.lastIndexProcessed+1;

    let speed;
    let totalDistance;
    let distance;
    let avgSpeed;
    let maxSpeed;
    for (let i=lastIndexProcessed;i<positions.length;i++){

        let lastPosition = positions[lastIndexProcessed - 1];
        let newPosition = positions[lastIndexProcessed];
        if (newPosition.date.getTime() - lastPosition.date.getTime() > GPS_TIME_INTERVAL + 5 * 1000) {
            continue;
        }

        let from = {lat: lastPosition.latitude, lon: lastPosition.longitude};
        let to = {lat: newPosition.latitude, lon: newPosition.longitude};
        let distanceSinceLastPos = calculateDistance(from, to);
        distance = state.ride.analytics.distance + distanceSinceLastPos;
        totalDistance = state.totalDistance + distanceSinceLastPos;
        let durationSinceLastPos = (newPosition.date.getTime() - lastPosition.date.getTime() ) / 1000;
        let duration = state.ride.pastDuration + (newPosition.date.getTime() - state.ride.geoIds.startTime) / 1000;

        avgSpeed = distance / duration;
        speed = newPosition.speed;
        if (speed < 0 || speed == undefined || Number.isNaN(speed)
        // || (speed === 0 && distanceSinceLastPos !== 0 && durationSinceLastPos!== 0 )
        ) {
            speed = distanceSinceLastPos / durationSinceLastPos;
        }


        newPosition = {
            ...newPosition,
            distance: distanceSinceLastPos,
            duration: durationSinceLastPos,
            speed: speed
        }
        maxSpeed = speed > state.ride.analytics.maxSpeed ? speed : state.ride.analytics.maxSpeed;
    }

    return {
        ...state,
        ride: {
            ...state.ride,
            analytics: {
                ...state.ride.analytics,
                distance: distance,
                // duration: duration,
                lastSpeed: speed,
                avgSpeed: avgSpeed,
                maxSpeed: maxSpeed,
            },
            lastIndexProcessed:lastIndexProcessed
        },
        totalDistance: totalDistance,
    };
};

export const updateTotalDistance = (state, totalDistance) => {
    return {
        ...state,
        totalDistance: totalDistance,
    }
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


export function updateRideAnalytics(ride) {
    let duration = ride.analytics.duration;
    let avgSpeed = ride.analytics.avgSpeed;
    if (ride.geoIds) {
        duration = ride.pastDuration + (moment().valueOf() - ride.geoIds.startTime) / 1000;
        avgSpeed = ride.analytics.distance / duration;
    }
    return {
        ...ride,
        analytics: {
            ...ride.analytics,
            duration: duration,
            avgSpeed: avgSpeed,
        },
        pastDuration: duration,
    };
}