import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';
import {
    addNavigationHelpers,
} from 'react-navigation';
import {
    connect,
} from 'react-redux';
import BottomTabNavigator from "./BottomTabNavConfiguration"
import * as globalStyles from "../../styles/global";


export default BottomTabNavContainer = connect(state => ({
    nav: state.nav,
}))(({dispatch, nav}) => (
    <View style={[globalStyles.COMMON_STYLES.main]}>
        <BottomTabNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
    </View>
));




