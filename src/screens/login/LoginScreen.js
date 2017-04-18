import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    Button
} from 'react-native';
import * as globalStyles from '../../styles/global';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../../util/utils";


export default class LoginScreen extends Component {

    state = {
        dataSource: {},
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[globalStyles.COMMON_STYLES.container,{
        alignItems: 'stretch',
                    flex:1,
                marginTop:5,
                marginBottom:5,
        //justifyContent: 'space-between',
        //flexDirection: 'column',
            }]}>
                <Button
                    onPress={() => this.props.navigation.navigate('BottomTabNavContainer')}
                    title="Login"
                />
            </View>);
    }
}

LoginScreen.propTypes = {
    Login: PropTypes.any,
};
