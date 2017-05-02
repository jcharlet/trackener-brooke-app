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
import {NAV_SETTINGS} from "../actions/actionTypes";
import * as PropTypes from "react/lib/ReactPropTypes";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    _navigateTo(screen) {
        this.props.navigation.navigate(screen);
    }

    _goBack() {
        this.props.navigation.goBack();
    }

    renderLeftElement(elementType) {
        switch (elementType) {
            case Header.leftIconType.TRACKENER_ICON:
                return (<View style={[globalStyles.COMMON_STYLES.verticallyAligned]}><Image
                    source={require('../../img/logo_white.png')}
                    style={globalStyles.COMMON_STYLES.headerImage}
                />
                </View>);
                break;
            case Header.leftIconType.BACK:
                return (<TouchableOpacity style={[globalStyles.COMMON_STYLES.verticallyAligned,
                    ]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                          onPress={() => this._goBack()}>
                    <Image source={require('../../img/ic_navigate_prev_white.png')}
                           style={globalStyles.COMMON_STYLES.headerImage}/>
                </TouchableOpacity>)
                break;
            default:
            case Header.leftIconType.EMPTY:
                return (<View style={[globalStyles.COMMON_STYLES.verticallyAligned]}>
                </View>);
                break;
        }
    }

    renderRightElement(elementType) {
        switch (elementType) {
            case Header.rightIconType.SETTINGS:
                return (<TouchableOpacity style={[globalStyles.COMMON_STYLES.verticallyAligned,
                    ]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                          onPress={() => this._navigateTo(NAV_SETTINGS)}>
                    <Image
                        source={require('../../img/header-settings.png')}
                        style={globalStyles.COMMON_STYLES.headerImage}
                    />
                </TouchableOpacity>)
                break;
            default:
            case Header.rightIconType.EMPTY:
                return (<View style={[globalStyles.COMMON_STYLES.verticallyAligned]}>
                </View>)
                break;
        }
    }

    render() {

        let leftElement = this.renderLeftElement(this.props.leftElement);
        let rightElement = this.renderRightElement(this.props.rightElement);

        return (
            <View style={globalStyles.COMMON_STYLES.header}>
                <View style={[globalStyles.COMMON_STYLES.headerImageView]}
                      activeOpacity={globalStyles.ACTIVE_OPACITY}>
                    {leftElement}
                </View>
                <View style={[globalStyles.COMMON_STYLES.headerView]}>
                    <View style={[globalStyles.COMMON_STYLES.verticallyAligned]}>
                        <Text style={globalStyles.COMMON_STYLES.headerText}>{this.props.title}</Text>
                    </View>
                </View>
                <View style={globalStyles.COMMON_STYLES.headerImageView}
                      activeOpacity={globalStyles.ACTIVE_OPACITY}>
                    {rightElement}
                </View>
            </View>
        );
    }

}


Header.propTypes = {
    title:PropTypes.string,
    showLeftIcon:PropTypes.bool,
    leftElement:PropTypes.string,
    rightElement:PropTypes.string,
    navigation:PropTypes.any,
};

Header.leftIconType = {
    EMPTY: "EMPTY",
    TRACKENER_ICON: "TRACKENER_ICON",
    BACK: "BACK",
}
Header.rightIconType = {
    EMPTY: "EMPTY",
    SETTINGS: "SETTINGS",
}