
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
import {SHOW_NEXT_HACK, SHOW_PREVIOUS_HACK} from "../actions/actionTypes";


const mapStateToProps = (state) => {
    return {
        hackDetails: state.hackDetails
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showPreviousHack: () => {
            dispatch({type:SHOW_PREVIOUS_HACK});
        },
        showNextHack: () => {
            dispatch({type:SHOW_NEXT_HACK})
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

