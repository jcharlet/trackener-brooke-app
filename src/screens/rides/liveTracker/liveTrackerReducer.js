import {
    START_RIDE, STOP_RIDE, PAUSE_RIDE, RESTART_RIDE, GPS_UPDATE_LOC,
    GPS_INIT_WATCH, UPDATE_TOTAL_DISTANCE
} from '../../../actions/actionTypes';
import moment from "moment";
import {POSITION_FIELDS} from "../../../modules/geoloc/geolocService";
import * as geolocService from "../../../modules/geoloc/geolocService";

export const STATUS = {STOP: 0, START: 1, PAUSE: 2, RESTARTING:3};


const initialState = {
    status: STATUS.STOP,
    totalDistance: 0,
    // ride:{
    //     date:null,
    //     geoIds: null,
    //     restartTimes:[],
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

        case GPS_INIT_WATCH:
            return initWatch(state, action.payload);
        case GPS_UPDATE_LOC:
            return updateLocation(state, action.payload);
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
            restartTimes:[],
            pastDuration: 0,
            analytics: {
                distance: 0,
                duration: 0,
                lastSpeed: 0,
                avgSpeed: 0,
                maxSpeed: 0,
            },
            lastIndexProcessed: 0,
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
        status: STATUS.RESTARTING,
        ride:{
            ...state.ride,
            restartTimes:[...state.ride.restartTimes, moment().valueOf()],
        }
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

export const updateLocation = (state, positions) => {
    if (positions.length === 0 || positions.length < 2) {
        return state;
    }

    let speed;
    let totalDistance = state.totalDistance;
    let distance = state.ride.analytics.distance;
    let avgSpeed;
    let maxSpeed = state.ride.analytics.maxSpeed;
    let status = state.status;
    for (let i = 1; i < positions.length; i++) {

        let lastPosition = positions[i - 1];
        let newPosition = positions[i];

        if (status===STATUS.RESTARTING){
            status=STATUS.START;
            //ignore 1 position so that we don't try to calculate distance between before and after time.
            continue;
        }



        let from = {lat: lastPosition[POSITION_FIELDS.LATITUDE], lon: lastPosition[POSITION_FIELDS.LONGITUDE]};
        let to = {lat: newPosition[POSITION_FIELDS.LATITUDE], lon: newPosition[POSITION_FIELDS.LONGITUDE]};
        let distanceSinceLastPos = geolocService.calculateDistance(from, to);
        distance += distanceSinceLastPos;
        totalDistance += distanceSinceLastPos;
        let durationSinceLastPos = (newPosition[POSITION_FIELDS.TIMESTAMP] - lastPosition[POSITION_FIELDS.TIMESTAMP] ) / 1000;
        let duration = state.ride.pastDuration + (newPosition[POSITION_FIELDS.TIMESTAMP] - state.ride.geoIds.startTime) / 1000;

        avgSpeed = distance / duration;
        speed = newPosition[POSITION_FIELDS.SPEED];
        if (speed < 0 || speed === undefined || Number.isNaN(speed)
        // || (speed === 0 && distanceSinceLastPos !== 0 && durationSinceLastPos!== 0 )
        ) {
            speed = distanceSinceLastPos / durationSinceLastPos;
        }else{
            //dont calculate maxSpeed if speed was not retrieved directly from gps (too inaccurate)
            maxSpeed = speed > maxSpeed ? speed : maxSpeed;
        }

        newPosition = {
            ...newPosition,
            distance: distanceSinceLastPos,
            duration: durationSinceLastPos,
            speed: speed
        }
    }

    let lastIndexProcessed =state.ride.lastIndexProcessed + positions.length-1;

    if (!distance) {
        return {
            ...state,
            ride: {
                ...state.ride,
                lastIndexProcessed: lastIndexProcessed
            },
        };
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
            lastIndexProcessed: lastIndexProcessed
        },
        status:status,
        totalDistance: totalDistance,
    };
}

export const updateTotalDistance = (state, totalDistance) => {
    return {
        ...state,
        totalDistance: totalDistance,
    }
}

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