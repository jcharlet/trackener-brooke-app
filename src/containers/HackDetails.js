
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


const mapStateToProps = (state) => {
    return {
        hackDetails: state.hackDetails
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

const LiveTracker = connect(
    mapStateToProps,
    mapDispatchToProps
)(HackDetailsScreen);

export default LiveTracker

