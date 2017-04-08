import React from 'react';
import {
    Image,
    View, StyleSheet, Platform
} from 'react-native';
import {TabNavigator} from "react-navigation";
import LiveTracker from "../containers/LiveTracker";
import HistoryScreen from "./HistoryScreen";
import * as globalStyles from "../styles/global"
import HackDetails from "../containers/HackDetails";

//FIXME calendar icon is cropped

LiveTracker.navigationOptions = {
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

HackDetails.navigationOptions = {
    title: 'Hack details',
    tabBar: {
        icon: ({tintColor}) => (
            <Image
                source={require('../../img/tab-exercising.png')}
                style={[FOOTER_STYLE.footerImage]}
            />
        ),
    },
};

HistoryScreen.navigationOptions = {
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
    LiveTracker: {screen: LiveTracker},
    HackDetails: {screen: HackDetails},
    // History: {screen: HistoryScreen},
}, {
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
