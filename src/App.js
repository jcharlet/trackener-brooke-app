import React, {Component} from 'react';
import {AppRegistry,View, AsyncStorage} from 'react-native';
import {
    Provider,
} from 'react-redux';
import createStore from "./store";
import MainNavContainer from "./navigation/main/MainNavContainer";
import * as storageService from "./modules/storage/storageService";
import {generateFakeData} from "./modules/storage/migration/generateFakeData";


import { Client } from 'bugsnag-react-native';

export default class App extends Component {
    store = createStore();

    bugsnag = new Client();

    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Warning: View.propTypes'];
        // storageService.sync();
        // storageService.emptyStorage();
        // generateFakeData()
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
