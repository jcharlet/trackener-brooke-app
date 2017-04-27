import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';
import * as globalStyles from './styles/global';
import {
    Provider,
} from 'react-redux';
import createStore from "./store";
import MainNavContainer from "./navigation/main/MainNavContainer";
import * as localStorageService from "./modules/localStorage/localStorageService";
import * as storageService from "./modules/storageService";


export default class App extends Component {
    store = createStore();

    constructor(props) {
        super(props);
        // localStorageService.emptyLocalStorage();
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
