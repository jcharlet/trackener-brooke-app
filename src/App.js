import React, {Component} from 'react';
import {AppRegistry,View, AsyncStorage} from 'react-native';
import {
    Provider,
} from 'react-redux';
import createStore from "./store";
import MainNavContainer from "./navigation/main/MainNavContainer";
import * as storageService from "./modules/storage/storageService";
import {generateFakeData} from "./modules/storage/migration/generateFakeData";


import { Client, Configuration} from 'bugsnag-react-native';

export default class App extends Component {
    store = createStore();

    bugsnag;

    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Warning: View.propTypes'];

            configuration = new Configuration();
            configuration.apiKey = "3ca64084491704d2c480c102a315ceb9";
            this.bugsnag=  new Client(configuration);
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
