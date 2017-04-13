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
import HistoryScreen from "../components/HistoryScreen";
import {loadRides} from "../actions/historyActions";

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


const History = connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryScreen);

export default History

