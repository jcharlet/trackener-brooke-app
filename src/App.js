import React, {Component} from 'react';
import {AppRegistry,View, AsyncStorage} from 'react-native';
import Header from './navigation/HeaderComponent'
import * as globalStyles from './styles/global';
import {
    Provider,
} from 'react-redux';
import createStore from "./store";
import BottomTabNavContainer from "./navigation/bottomBar/BottomTabNavContainer";


export default class App extends Component {
    store = createStore();
    constructor(props) {
        super(props);
        // AsyncStorage.setItem('rides', JSON.stringify([]));
        // AsyncStorage.setItem('totalDistance', JSON.stringify([]));
    }

    render() {
        return (
            <View style={[globalStyles.COMMON_STYLES.main]}>
                <Header/>
                <Provider store={this.store}>
                    <BottomTabNavContainer/>
                </Provider>
            </View>
        );
    }
}

AppRegistry.registerComponent('TrackenerBrookeApp', () => App);
