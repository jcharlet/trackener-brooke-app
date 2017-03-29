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
import Header from './src/components/Header'
import Footer from './src/components/Footer'
import LiveTracker from './src/containers/LiveTracker'
import * as globalStyles from './src/styles/global';
import { Provider } from 'react-redux';
import createStore from "./src/store";

const store = createStore();

export default class TrackenerBrookeApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[globalStyles.COMMON_STYLES.main]}>
                <Header/>
                <Provider store={store}>
                    <LiveTracker/>
                </Provider>
                <Footer/>
            </View>
        );
    }

}

AppRegistry.registerComponent('TrackenerBrookeApp', () => TrackenerBrookeApp);
