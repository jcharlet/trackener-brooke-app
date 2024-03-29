
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
import {showPreviousRide, showNextRide, removeRide} from "./hackDetailsActions";
import {wait} from "../../../util/utils.js";

const mapStateToProps = (state) => {
    return {
        hackDetails: state.hackDetails
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showPreviousRide: () => {
            dispatch(showPreviousRide());
        },
        showNextRide: () => {
            dispatch(showNextRide())
        },
        hasPreviousRide: (index:number, length:number) => {
            return hasPreviousRide(index,length)
        },
        hasNextRide: (index:number, length:number) => {
            return hasNextRide(index,length)
        },
        remove: (date:number, distance:number) => {
            dispatch(removeRide(date, distance))
            wait(500);
        },
    }
};


function hasPreviousRide(index:number,length:number) {
    return (index>0)
}
function hasNextRide(index:number,length:number) {
    return (index<length-1)
}

const HackDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HackDetailsScreen);

export default HackDetailsContainer
