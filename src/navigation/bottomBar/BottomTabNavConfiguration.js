import React from 'react';
import {
    Image,
    View, StyleSheet, Platform
} from 'react-native';
import {TabNavigator} from "react-navigation";
import LiveTrackerContainer from "../../screens/liveTracker/LiveTrackerContainer";
import HistoryContainer from "../../screens/history/HistoryContainer";
import * as globalStyles from "../../styles/global"
import HackDetailsContainer from "../../screens/hackDetails/HackDetailsContainer";
import TabView from "react-navigation/src/views/TabView/TabView";

LiveTrackerContainer.navigationOptions = {
    title: 'Tracker',
    tabBar: {
        icon: ({tintColor}) => (
            <Image
                source={require('../../../img/tab-dashboard.png')}
                style={[globalStyles.COMMON_STYLES.footerImage]}
            />
        ),
    },
};

HackDetailsContainer.navigationOptions = {
    title: 'Ride details',
    tabBar: {
        icon: ({tintColor}) => (
            <Image
                source={require('../../../img/tab-exercising.png')}
                style={[globalStyles.COMMON_STYLES.footerImage]}
            />
        ),
    },
};

HistoryContainer.navigationOptions = {
    title: 'History',
    tabBar: {
        icon: ({tintColor}) => (
            <Image
                source={require('../../../img/tab-calendar.png')}
                style={[globalStyles.COMMON_STYLES.footerImage]}
            />
        ),
    },
};

export default BottomTabNavigator = TabNavigator({
    LiveTracker: {screen: LiveTrackerContainer},
    HackDetails: {screen: HackDetailsContainer},
    History: {screen: HistoryContainer},
}, {
    tabBarComponent:TabView.TabBarTop,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: globalStyles.WHITE,
        inactiveTintColor: globalStyles.GRAY,
        showIcon: true,
        // showLabel:true,
        style: globalStyles.COMMON_STYLES.footerStyle,
        tabStyle: {},
        indicatorStyle: globalStyles.COMMON_STYLES.footerIndicatorStyle,
        labelStyle: globalStyles.COMMON_STYLES.footerLabel,
    },
});
