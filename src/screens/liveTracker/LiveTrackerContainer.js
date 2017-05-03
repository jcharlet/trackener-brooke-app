import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import LiveTrackerScreen from "./LiveTrackerScreen";
import {connect} from "react-redux";
import {
    startRide, watchGPS,
    checkLocationServicesIsEnabled
} from "./liveTrackerActions";


const mapStateToProps = (state) => {
    return {
        liveTracker: state.liveTracker,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkLocationServicesIsEnabled: () => {
            checkLocationServicesIsEnabled();
        },
        startTracking: () => {
            checkLocationServicesIsEnabled().then(() => {
                dispatch(startRide());
                dispatch(watchGPS());
            })
        },
    }
};

const LiveTrackerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveTrackerScreen);

export default LiveTrackerContainer
