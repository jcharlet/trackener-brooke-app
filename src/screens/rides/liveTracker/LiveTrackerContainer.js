import React, {Component} from 'react';
import LiveTrackerScreen from "./LiveTrackerScreen";
import {connect} from "react-redux";
import {
    startRide, watchGPS
} from "./liveTrackerActions";
import * as geolocService from "../../../modules/geoloc/geolocService";
import moment from "moment";
import Logentries from 'react-native-logentries';

const mapStateToProps = (state) => {
    return {
        liveTracker: state.liveTracker,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        hotStartGPS: () => {
            return geolocService.checkLocationServicesIsEnabled()
                .then(isEnabled => {
                    if(isEnabled){
                        geolocService.startGPS();
                    }
                });
        },
        startTracking: () => {
            return geolocService.checkLocationServicesIsEnabled().then((isAuthorized) => {
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
