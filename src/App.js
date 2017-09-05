import React, {Component} from 'react';
import {AppRegistry,View, BackHandler, Platform} from 'react-native';
import {
    Provider,
} from 'react-redux';
import createStore from "./store";
import MainNavContainer from "./navigation/main/MainNavContainer";
import * as storageService from "./modules/storage/storageService";
import {generateFakeData} from "./modules/storage/migration/generateFakeData";
import Logentries from 'react-native-logentries';
import { Text } from 'react-native';
import {LOGENTRIES_TOKEN} from './config/configApi';

Text.defaultProps.allowFontScaling = false;

import * as reportingService from "./modules/reporting/reportingService";

export default class App extends Component {
    store = createStore();
    backButtonListener = null;

    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Warning: View.propTypes'];
        Logentries.setToken(LOGENTRIES_TOKEN);
        reportingService.initBugsnag();
        // storageService.sync();
        // storageService.emptyStorage();
        // generateFakeData()
    }

    componentDidMount() {
        if (Platform.OS === "android" && this.backButtonListener === null) {
            this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => true);
        }
        
    }

    render() {
        return (
            <Provider store={this.store}>
                <MainNavContainer/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('TrackenerBrookeApp', () => App);
