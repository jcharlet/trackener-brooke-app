
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
import {START_RIDE, STOP_RIDE, PAUSE_RIDE, RESTART_RIDE} from "../actions/actionTypes";
import {connect} from "react-redux";
import {watchGPS} from "../reducers/liveTrackerReducer";


const mapStateToProps = (state) => {
    return {
        liveTracker: state.liveTracker
    }
};

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

