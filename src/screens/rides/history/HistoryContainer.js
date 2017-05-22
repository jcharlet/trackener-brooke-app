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
import {NAV_HACK_DETAILS} from "../../../actions/actionTypes";

const mapStateToProps = (state) => {
    return {
        history: state.history
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigateToHackDetails : (date) =>{
            dispatch({
                type: NAV_HACK_DETAILS,
                payload: date,
            });
        }
    }
};


const HistoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryScreen);

export default HistoryContainer

