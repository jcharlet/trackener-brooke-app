
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import HackDetailsScreen from "../components/HackDetailsScreen";
import {connect} from "react-redux";
import {loadRides, showPreviousHack, showNextHack} from "../actions/hackDetailsActions";

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
    }
};


function hasPreviousHack(index:number,length:number) {
    return (index>0)
}
function hasNextHack(index:number,length:number) {
    return (index<length-1)
}

const LiveTracker = connect(
    mapStateToProps,
    mapDispatchToProps
)(HackDetailsScreen);

export default LiveTracker

