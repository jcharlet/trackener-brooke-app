import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {connect} from "react-redux";
import {stopRide, pauseRide, restartRide, clearWatchGps, updateTotalDistance, addRide
} from "./liveTrackerStartedActions";
import {sync} from "../../modules/storageService";
import LiveTrackerStartedScreen from "./LiveTrackerStartedScreen";
import {watchGPS} from "./liveTrackerActions";


const mapStateToProps = (state) => {
    return {
        liveTracker: state.liveTracker,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        stopTracking: (distance) => {
            dispatch(clearWatchGps());
            dispatch(updateTotalDistance(distance));
            dispatch(stopRide());
            dispatch(addRide());
            sync();
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

const LiveTrackerStartedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveTrackerStartedScreen);

export default LiveTrackerStartedContainer
