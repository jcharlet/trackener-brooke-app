import React, {Component} from 'react';
import {connect} from "react-redux";
import {modifyPassword} from "./modifyPasswordActions";
import ModifyPasswordScreen from "./ModifyPasswordScreen";

const mapStateToProps = (state) => {
    return {
        modifyPassword: state.modifyPassword
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        doModifyPassword: (previousPassword: string, password: string, repeatPassword: string) => {
            dispatch(modifyPassword(previousPassword,password,repeatPassword));
        },
    }
};


const ModifyPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModifyPasswordScreen);

export default ModifyPasswordContainer

