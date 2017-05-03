import React, {Component} from 'react';
import {AppRegistry,View, AsyncStorage} from 'react-native';
import {
    Provider,
} from 'react-redux';
import createStore from "./store";
import MainNavContainer from "./navigation/main/MainNavContainer";
import * as localRidesRepository from "./modules/storage/localStorage/localRidesRepository";
import * as totalDistanceRepository from "./modules/storage/localStorage/totalDistanceRepository";


export default class App extends Component {
    store = createStore();

    constructor(props) {
        super(props);
        // localRidesRepository.saveRides([]);
        // totalDistanceRepository.saveTotalDistance(0);
        // storageService.sync();
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
