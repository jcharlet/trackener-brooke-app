import React, {Component} from 'react';
import {AppRegistry,View, AsyncStorage} from 'react-native';
import Header from './navigation/HeaderComponent'
import * as globalStyles from './styles/global';
import {
    addNavigationHelpers,
} from 'react-navigation';
import {
    Provider,
    connect,
} from 'react-redux';
import createStore from "./store";
import AppNavigator from "./navigation/AppNavigator"

const AppWithNavigationState = connect(state => ({
    nav: state.nav,
}))(({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

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
                    <AppWithNavigationState/>
                </Provider>
            </View>
        );
    }
}

AppRegistry.registerComponent('TrackenerBrookeApp', () => App);
