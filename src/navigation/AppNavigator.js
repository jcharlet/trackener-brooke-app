import React from 'react';
import {
    Image,
    View, StyleSheet, Platform
} from 'react-native';
import {TabNavigator} from "react-navigation";
import LiveTrackerContainer from "../screens/liveTracker/LiveTrackerContainer";
import HistoryContainer from "../screens/history/HistoryContainer";
import * as globalStyles from "../styles/global"
import HackDetailsContainer from "../screens/hackDetails/HackDetailsContainer";
import TabView from "react-navigation/src/views/TabView/TabView";

//FIXME calendar icon is cropped

LiveTrackerContainer.navigationOptions = {
    title: 'Tracker',
    tabBar: {
        icon: ({tintColor}) => (
            <Image
                source={require('../../img/tab-dashboard.png')}
                style={[FOOTER_STYLE.footerImage]}
            />
        ),
    },
};

HackDetailsContainer.navigationOptions = {
    title: 'Ride details',
    tabBar: {
        icon: ({tintColor}) => (
            <Image
                source={require('../../img/tab-exercising.png')}
                style={[FOOTER_STYLE.footerImage]}
            />
        ),
    },
};

HistoryContainer.navigationOptions = {
    title: 'History',
    tabBar: {
        icon: ({tintColor}) => (
            <Image
                source={require('../../img/tab-calendar.png')}
                style={[FOOTER_STYLE.footerImage]}
            />
        ),
    },
};

export default AppNavigator = TabNavigator({
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
        style: {
            backgroundColor: globalStyles.GREEN,
            paddingBottom: Platform.OS === 'ios' ? 2 : 0,
        },
        tabStyle: {
      },
        indicatorStyle: {
            backgroundColor: globalStyles.WHITE,
            height: 4,
        },
        labelStyle: {
            margin: 4,
            marginBottom: 0,

        },
    },
});


export const FOOTER_STYLE = ({
    footerImage: {
        width: 24,
        height: 24,
    },
});
