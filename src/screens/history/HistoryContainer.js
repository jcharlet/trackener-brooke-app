import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {connect} from "react-redux";
import HistoryScreen from "./HistoryScreen";
import {loadRides} from "./historyActions";

const mapStateToProps = (state) => {
    return {
        history: state.history
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => {
            dispatch(loadRides());
        },
    }
};


const HistoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryScreen);

export default HistoryContainer

