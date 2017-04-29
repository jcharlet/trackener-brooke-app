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


type Props = {
    title:String,
    showLeftIcon:boolean,
};

export default class Header extends Component {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let icon=(
            <View style={[globalStyles.COMMON_STYLES.verticallyAligned]}>
            </View>);
        if (this.props.showLeftIcon){
            icon = (
                <View style={[globalStyles.COMMON_STYLES.verticallyAligned]}><Image
                source={require('../../img/logo_white.png')}
                style={globalStyles.COMMON_STYLES.headerImage}
            />
                </View>);
        }
        return (
            <View style={globalStyles.COMMON_STYLES.header}>
                <View style={[globalStyles.COMMON_STYLES.headerImageView]}
                      activeOpacity={globalStyles.ACTIVE_OPACITY}>
                        {icon}
                </View>
                <View style={[globalStyles.COMMON_STYLES.headerView]}>
                    <View style={[globalStyles.COMMON_STYLES.verticallyAligned]}>
                        <Text style={globalStyles.COMMON_STYLES.headerText}>{this.props.title}</Text>
                    </View>
                </View>
                <View style={globalStyles.COMMON_STYLES.headerImageView}
                      activeOpacity={globalStyles.ACTIVE_OPACITY}>
                    <View style={[globalStyles.COMMON_STYLES.verticallyAligned]}>
                        {/*<Image*/}
                        {/*source={require('../../img/header-settings.png')}*/}
                        {/*style={globalStyles.COMMON_STYLES.headerImage}*/}
                        {/*/>*/}
                    </View>
                </View>
            </View>
        );
    }

}