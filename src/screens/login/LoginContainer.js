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
import LoginScreen from "./LoginScreen";

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};


const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);

export default LoginContainer

