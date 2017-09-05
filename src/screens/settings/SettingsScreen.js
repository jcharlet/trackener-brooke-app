import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';
import * as globalStyles from '../../styles/global';
import * as PropTypes from "prop-types";
import * as utils from "../../util/utils";
import {NAV_RESET_PASSWORD} from "../../actions/actionTypes";
import HeaderComponent from '../../components/HeaderComponent'


import {ViewPropTypes} from 'react-native'

export default class SettingsScreen extends Component {
    static propTypes = {
        ...ViewPropTypes,
        settings: PropTypes.any,
        logout: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.props.load();
    }

    _navigateTo(screen) {
        this.props.navigation.navigate(screen);
    }

    renderModifyPasswordButton(isOffline) {
        if (isOffline) {
            return (
                <View style={[globalStyles.COMMON_STYLES.buttonView, globalStyles.COMMON_STYLES.grayButton]}>
                    <Text style={[globalStyles.COMMON_STYLES.buttonText]}>Modify password</Text>
                </View>
            );
        }
        return (
            <TouchableOpacity style={[globalStyles.COMMON_STYLES.centeredElement,
            ]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                              onPress={() => {
                                  this._navigateTo(NAV_RESET_PASSWORD)
                              }}>

                <View style={[globalStyles.COMMON_STYLES.buttonView, globalStyles.COMMON_STYLES.greenButton]}>
                    <Text style={[globalStyles.COMMON_STYLES.buttonText]}>Modify password</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'stretch',}}>
                <HeaderComponent
                    title={"Settings"}
                    navigation={this.props.navigation}
                    leftElement={HeaderComponent.leftIconType.BACK}
                    rightElement={'EMPTY'}
                />
                <View style={[globalStyles.COMMON_STYLES.container, {

                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'column',

                }]}>
                    <View style={[globalStyles.COMMON_STYLES.buttonView,]}>
                        <Text style={[globalStyles.COMMON_STYLES.fontSizeNormal]}>logged as </Text><Text
                        style={[globalStyles.COMMON_STYLES.fontSizeNormal, {
                            color: globalStyles.GREEN,
                            fontWeight: 'bold'
                        }]}>{this.props.settings.username}</Text>
                    </View>

                    {this.renderModifyPasswordButton(this.props.settings.isOffline)}

                    <TouchableOpacity style={[globalStyles.COMMON_STYLES.centeredElement,
                    ]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                      onPress={() => {
                                          this.props.logout()
                                      }}>

                        <View style={[globalStyles.COMMON_STYLES.buttonView, globalStyles.COMMON_STYLES.redButton]}>
                            <Text style={[globalStyles.COMMON_STYLES.buttonText]}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

SettingsScreen.navigationOptions = {
    title: 'Settings',
};

