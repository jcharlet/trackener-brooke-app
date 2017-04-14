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

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={globalStyles.COMMON_STYLES.header}>
                <TouchableOpacity style={[globalStyles.COMMON_STYLES.headerImageView]}
                                  activeOpacity={globalStyles.ACTIVE_OPACITY}>
                    <View style={[globalStyles.COMMON_STYLES.verticallyAligned]}>
                        <Image
                            source={require('../../img/header-horse.png')}
                            style={globalStyles.COMMON_STYLES.headerImage}
                        />
                    </View>
                </TouchableOpacity>
                <View style={[globalStyles.COMMON_STYLES.headerView]}>
                    <View style={[globalStyles.COMMON_STYLES.verticallyAligned]}>
                        <Text style={globalStyles.COMMON_STYLES.headerText}>My Hackathon</Text>
                    </View>
                </View>
                <TouchableOpacity style={globalStyles.COMMON_STYLES.headerImageView}
                                  activeOpacity={globalStyles.ACTIVE_OPACITY}>
                    <View style={[globalStyles.COMMON_STYLES.verticallyAligned]}>
                        <Image
                            source={require('../../img/header-settings.png')}
                            style={globalStyles.COMMON_STYLES.headerImage}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}