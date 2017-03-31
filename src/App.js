import React, {Component} from 'react';
import {AppRegistry,View} from 'react-native';
import Header from './components/Header'
import Footer from './components/Footer'
import * as globalStyles from './styles/global';
import {
    addNavigationHelpers,
} from 'react-navigation';
import {
    Provider,
    connect,
} from 'react-redux';
import createStore from "./store";
import AppNavigator from "./containers/AppNavigator"

const AppWithNavigationState = connect(state => ({
    nav: state.nav,
}))(({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

export default class App extends Component {
    store = createStore();
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[globalStyles.COMMON_STYLES.main]}>
                <Header/>
                <Provider store={this.store}>
                    <AppWithNavigationState/>
                </Provider>
                <Footer/>
            </View>
        );
    }
}

AppRegistry.registerComponent('TrackenerBrookeApp', () => App);
