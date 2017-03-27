/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
} from 'react-native';
import Header from './src/containers/Header'
import Footer from './src/containers/Footer'
import LiveTracker from './src/containers/LiveTracker'
import * as globalStyles from './src/styles/global';

export default class TrackenerBrookeApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[globalStyles.COMMON_STYLES.main]}>
                <Header/>
                <LiveTracker/>
                <Footer/>
            </View>
        );
    }

}

AppRegistry.registerComponent('TrackenerBrookeApp', () => TrackenerBrookeApp);
