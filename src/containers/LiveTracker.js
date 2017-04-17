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
import {startRide, stopRide, pauseRide, restartRide, watchGPS, clearWatchGps, updateTotalDistance, addRide,
    loadTotalDistance, checkLocationServicesIsEnabled
} from "../actions/liveTrackerActions";


const mapStateToProps = (state) => {
    return {
        liveTracker: state.liveTracker,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        load:() => {
            dispatch(loadTotalDistance());
        },
        startTracking: () => {
                checkLocationServicesIsEnabled().then(()=>{
                    dispatch(startRide());
                    dispatch(watchGPS());
                })
        },
        stopTracking: (ride,distance) => {
            dispatch(clearWatchGps());
            dispatch(updateTotalDistance(distance));
            dispatch(addRide(ride));
            dispatch(stopRide());
        },
        pauseTracking: () => {
            dispatch(clearWatchGps());
            dispatch(pauseRide());
        },
        restartTracking: () => {
            dispatch(restartRide());
            dispatch(watchGPS());
        },
    }
};

const LiveTracker = connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveTrackerPage);

export default LiveTracker

