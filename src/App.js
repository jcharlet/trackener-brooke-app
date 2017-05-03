import React, {Component} from 'react';
import {AppRegistry,View, AsyncStorage} from 'react-native';
import {
    Provider,
} from 'react-redux';
import createStore from "./store";
import MainNavContainer from "./navigation/main/MainNavContainer";
import * as storageService from "./modules/storage/storageService";


export default class App extends Component {
    store = createStore();

    constructor(props) {
        super(props);
        // storageService.sync();
        // storageService.emptyStorage();
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
