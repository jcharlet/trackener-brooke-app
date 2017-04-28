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
import RegisterScreen from "./RegisterScreen";
import {register} from "./registerActions";

const mapStateToProps = (state) => {
    return {
        register: state.register
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        doRegister: (email: string, username: string, password: string, repeatPassword: string) => {
            dispatch(register(email,username,password,repeatPassword));
        },
    }
};


const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterScreen);

export default RegisterContainer

