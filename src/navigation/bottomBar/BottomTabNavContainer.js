import React, {Component} from 'react';
import {AppRegistry,View, AsyncStorage} from 'react-native';
import {
    addNavigationHelpers,
} from 'react-navigation';
import {
    connect,
} from 'react-redux';
import BottomTabNavigator from "./BottomTabNavConfiguration"


export default BottomTabNavContainer = connect(state => ({
    nav: state.nav,
}))(({ dispatch, nav }) => (
    <BottomTabNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));




