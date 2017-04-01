
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import LiveTrackerPage from "../components/LiveTrackerPage";
import {START_RIDE, STOP_RIDE, PAUSE_RIDE, RESTART_RIDE, ADD_RIDE} from "../actions/actionTypes";
import {connect} from "react-redux";
import {watchGPS} from "../reducers/liveTrackerReducer";
import * as globalStyles from "../styles/global";


const mapStateToProps = (state) => {
    return {
        liveTracker: state.liveTracker,
    }
};

function addRide(){
    return(dispatch, getState)=>{
        let state = getState();

        dispatch({type:ADD_RIDE, payload:{
            date:state.liveTracker.date,
            startDate:0,
            distance: state.liveTracker.distance,
            duration: state.liveTracker.duration,
            avgSpeed: 0,
            maxSpeed: 0
        }
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startTracking: () => {
            //FIXME thunk had to be called directly for some reason
            // dispatch({type:START_GPS_WATCH});
            dispatch(watchGPS());
            dispatch({type:START_RIDE});
            // dispatch(stopAfterFiveSeconds());
        },
        stopTracking: () => {
            dispatch(addRide());
            dispatch({type:STOP_RIDE})
        },
        pauseTracking: () => {
            dispatch({type:PAUSE_RIDE})
        },
        restartTracking: () => {
            dispatch(watchGPS());
            dispatch({type:RESTART_RIDE})
        },
    }
};

const LiveTracker = connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveTrackerPage);

export default LiveTracker

