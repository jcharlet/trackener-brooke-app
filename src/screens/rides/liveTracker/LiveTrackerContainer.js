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
import moment from "moment";
import Logentries from 'react-native-logentries';

const mapStateToProps = (state) => {
    return {
        liveTracker: state.liveTracker,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkLocationServicesIsEnabled: () => {
            return checkLocationServicesIsEnabled();
        },
        startTracking: () => {
            return checkLocationServicesIsEnabled().then((isAuthorized) => {
                if(isAuthorized){                  
                    let startDate = moment().format();
                    Logentries.log('-----start--------' + startDate + '-----start--------');
                    dispatch(watchGPS(startDate));
                    dispatch(startRide(startDate));
                }
            })
        },
    }
};

const LiveTrackerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveTrackerScreen);

export default LiveTrackerContainer
