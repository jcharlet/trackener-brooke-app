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
import LiveTrackerPage from "./LiveTrackerScreen";
import {connect} from "react-redux";
import {startRide, stopRide, pauseRide, restartRide, watchGPS, clearWatchGps, updateTotalDistance, addRide,
    loadTotalDistance, checkLocationServicesIsEnabled
} from "./liveTrackerActions";


const mapStateToProps = (state) => {
    return {
        liveTracker: state.liveTracker,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkLocationServicesIsEnabled:()=>{
          checkLocationServicesIsEnabled();
        },
        load:() => {
            dispatch(loadTotalDistance());
        },
        startTracking: () => {
                checkLocationServicesIsEnabled().then(()=>{
                    dispatch(startRide());
                    dispatch(watchGPS());
                })
        },
        stopTracking: (distance) => {
            dispatch(clearWatchGps());
            dispatch(updateTotalDistance(distance));
            dispatch(stopRide());
            dispatch(addRide());
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

const LiveTrackerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveTrackerPage);

export default LiveTrackerContainer
