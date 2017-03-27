/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import * as globalStyles from '../styles/global';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[globalStyles.COMMON_STYLES.footer]}>
                <TouchableOpacity style={[globalStyles.COMMON_STYLES.footerView, globalStyles.COMMON_STYLES.tabSelected]}
                                  activeOpacity={globalStyles.ACTIVE_OPACITY}
                    //onPress={() => console.log('Press complete')}
                >
                    <Image
                        source={require('../../img/tab-dashboard.png')}
                        style={globalStyles.COMMON_STYLES.footerImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyles.COMMON_STYLES.footerView]} activeOpacity={globalStyles.ACTIVE_OPACITY}>
                    <Image
                        source={require('../../img/tab-exercising.png')}
                        style={[globalStyles.COMMON_STYLES.footerImage,{width: 34}]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyles.COMMON_STYLES.footerView]} activeOpacity={globalStyles.ACTIVE_OPACITY}>
                    <Image
                        source={require('../../img/tab-calendar.png')}
                        style={[globalStyles.COMMON_STYLES.footerImage,{width: 28}]}
                    />
                </TouchableOpacity>
            </View>

        );
    }

}

AppRegistry.registerComponent('TrackenerBrookeApp', () => TrackenerBrookeApp);
