
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import HackDetailsScreen from "./HackDetailsScreen";
import {connect} from "react-redux";
import {loadRides, showPreviousHack, showNextHack, removeHack} from "./hackDetailsActions";
import {updateTotalDistance} from "../liveTracker/liveTrackerActions";
import {wait} from "../../util/utils.js";

const mapStateToProps = (state) => {
    return {
        hackDetails: state.hackDetails
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => {
            dispatch(loadRides());
        },
        showPreviousHack: () => {
            dispatch(showPreviousHack());
        },
        showNextHack: () => {
            dispatch(showNextHack())
        },
        hasPreviousHack: (index:number,length:number) => {
            return hasPreviousHack(index,length)
        },
        hasNextHack: (index:number,length:number) => {
            return hasNextHack(index,length)
        },
        remove: (date:number, distance:number) => {
            dispatch(removeHack(date))
            dispatch(updateTotalDistance(-distance));
            wait(500);
        },
    }
};


function hasPreviousHack(index:number,length:number) {
    return (index>0)
}
function hasNextHack(index:number,length:number) {
    return (index<length-1)
}

const HackDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HackDetailsScreen);

export default HackDetailsContainer
