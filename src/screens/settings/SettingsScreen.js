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
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../../util/utils";
import {NAV_HACK_DETAILS} from "../../actions/actionTypes";
import HeaderComponent from '../../components/HeaderComponent'


export default class SettingsScreen extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{flex: 1,alignItems: 'stretch',}}>
                <HeaderComponent
                    title={"Settings"}
                    navigation={this.props.navigation}
                    leftElement={HeaderComponent.leftIconType.BACK}
                    rightElement={HeaderComponent.rightIconType.EMPTY}
                />
                <View style={[globalStyles.COMMON_STYLES.container,{

                    flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

            }]}>
                    {/*<Text*/}
                        {/*style={{*/}
                    {/*textAlign:"center",*/}
        {/*fontSize: 20,*/}
        {/*padding: 20,*/}
        {/*color: globalStyles.GREEN,*/}
        {/*//borderStyle: 'solid',*/}
        {/*//borderColor: 'red',*/}
        {/*//borderWidth: 1*/}
                {/*}}*/}
                    {/*>Settings</Text>*/}

                    <TouchableOpacity style={[globalStyles.COMMON_STYLES.centeredElement,
                    ]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                      onPress={() => {this.props.logout()}}>

                        <View style={[globalStyles.COMMON_STYLES.buttonView,globalStyles.COMMON_STYLES.redButton]}>
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
SettingsScreen.propTypes = {
    settings: PropTypes.any,
    logout: PropTypes.func,
};