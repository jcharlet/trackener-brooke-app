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
import SettingsScreen from "./SettingsScreen";
import {loadSettings, logout} from "./settingsActions";

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        },
        load: () => {
            dispatch(loadSettings());
        }
    }
};


const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsScreen);

export default SettingsContainer

