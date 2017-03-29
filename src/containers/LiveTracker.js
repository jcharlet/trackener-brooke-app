
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


const mapStateToProps = (state) => {
    return {
        liveTracker: state.liveTracker
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startTracking: () => {
            dispatch({type:START_RIDE})
        },
        stopTracking: () => {
            dispatch({type:STOP_RIDE})
        },
        pauseTracking: () => {
            dispatch({type:PAUSE_RIDE})
        },
        restartTracking: () => {
            dispatch({type:RESTART_RIDE})
        },
    }
};

const LiveTracker = connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveTrackerPage);

export default LiveTracker

