import React, {Component} from 'react';
import {AppRegistry, View, AsyncStorage} from 'react-native';
import * as globalStyles from './styles/global';
import {
    Provider,
} from 'react-redux';
import createStore from "./store";
import MainNavContainer from "./navigation/main/MainNavContainer";


export default class App extends Component {
    store = createStore();

    constructor(props) {
        super(props);
        // AsyncStorage.setItem('rides', JSON.stringify([]));
        // AsyncStorage.setItem('totalDistance', JSON.stringify([]));
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
