import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import LiveTrackerPage from "../components/LiveTrackerScreen";
import {connect} from "react-redux";
import {addRide} from "../actions/hackDetailsActions";
import {startRide, stopRide, pauseRide, restartRide, watchGPS, clearWatchGps} from "../actions/liveTrackerActions";


const mapStateToProps = (state) => {
    return {
        liveTracker: state.liveTracker,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startTracking: () => {
            //FIXME LOW thunk had to be called directly for some reason
            // dispatch({type:START_GPS_WATCH});
            dispatch(startRide());
            dispatch(watchGPS());
            // dispatch(stopAfterFiveSeconds());
        },
        stopTracking: (ride) => {
            dispatch(clearWatchGps());
            dispatch(addRide(ride));
            dispatch(stopRide());
        },
        pauseTracking: () => {
            dispatch(clearWatchGps());
            dispatch(pauseRide());
        },
        restartTracking: () => {
            dispatch(watchGPS());
            dispatch(restartRide());
        },
    }
};

const LiveTracker = connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveTrackerPage);

export default LiveTracker

