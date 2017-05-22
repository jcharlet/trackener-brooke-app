import {
    START_RIDE, STOP_RIDE, PAUSE_RIDE, RESTART_RIDE, GPS_UPDATE_LOC,
    GPS_INIT_WATCH, UPDATE_TOTAL_DISTANCE
} from '../../../actions/actionTypes';
import moment from "moment";
import {GPS_TIME_INTERVAL} from "../../../config/config";
import {POSITION_FIELDS} from "../../../modules/geoloc/geolocService";

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
        case GPS_UPDATE_LOC:
            return updateLocation(state, action.payload);
        default:
            return state;
    }
};

const startRide = (state, deviceId) => {
    return {
        ...state,
        status: STATUS.START,
        ride: {
            date: moment().format(),
            deviceId: deviceId,
            geoIds: null,
            pastDuration:0,
            positions: [],
            analytics: {
                distance: 0,
                duration: 0,
                lastSpeed: 0,
                avgSpeed: 0,
                maxSpeed: 0,
            },
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
    let ride=updateRideAnalytics(state.ride)
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
            geoIds:geoIds
        },
    };
};

const updateLocation = (state, newPosition) => {

    if(!state.ride.geoIds){
        return state;
    }

    if (!state.ride.positions || state.ride.positions.length == 0) {
        return {
            ...state,
            ride: {
                ...state.ride,
                positions: [
                    ...state.ride.positions,
                    newPosition,
                ],
            },
        }
    }
    let lastPosition = state.ride.positions[state.ride.positions.length - 1];
    if (newPosition[POSITION_FIELDS.TIMESTAMP] - lastPosition[POSITION_FIELDS.TIMESTAMP] < GPS_TIME_INTERVAL) {
        return state;
    }
    if (newPosition[POSITION_FIELDS.TIMESTAMP] - lastPosition[POSITION_FIELDS.TIMESTAMP] > GPS_TIME_INTERVAL + 5 * 1000) {
        return {
            ...state,
            ride: {
                ...state.ride,
                positions: [
                    ...state.ride.positions,
                    newPosition,
                ],
            },
        }
    }

    let from = {lat: lastPosition[POSITION_FIELDS.LATITUDE], lon: lastPosition[POSITION_FIELDS.LONGITUDE]};
    let to = {lat: newPosition[POSITION_FIELDS.LATITUDE], lon: newPosition[POSITION_FIELDS.LONGITUDE]};
    let distanceSinceLastPos = calculateDistance(from, to);
    let distance = state.ride.analytics.distance + distanceSinceLastPos;
    let totalDistance = state.totalDistance + distanceSinceLastPos;
    let durationSinceLastPos = newPosition[POSITION_FIELDS.TIMESTAMP] - lastPosition[POSITION_FIELDS.TIMESTAMP];
    let duration = state.ride.pastDuration + (newPosition[POSITION_FIELDS.TIMESTAMP] - state.ride.geoIds.startTime) / 1000;
    let avgSpeed = distance / duration;
    let speed = newPosition[POSITION_FIELDS.SPEED];

    if(speed <0 || speed == undefined || speed == "NaN"){
      speed=distanceSinceLastPos/durationSinceLastPos;
    }

    newPosition = {
      ...newPosition,
      distance:distanceSinceLastPos,
      duration:durationSinceLastPos,
      speed:speed
    }

    let maxSpeed = speed > state.ride.analytics.maxSpeed ? speed : state.ride.analytics.maxSpeed

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
            positions: [
                ...state.ride.positions,
                newPosition,
            ]
        },
        totalDistance: totalDistance,
    };
};

export const updateTotalDistance= (state, totalDistance) =>{
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
    let duration=ride.analytics.duration;
    let avgSpeed=ride.analytics.avgSpeed;
    if(ride.geoIds){
        duration = ride.pastDuration + (moment().valueOf() - ride.geoIds.startTime) / 1000;
        avgSpeed = ride.analytics.distance / duration;
    }
    return {
        ...ride,
        analytics:{
            ...ride.analytics,
            duration:duration,
            avgSpeed:avgSpeed,
        },
        pastDuration:duration,
    };
}