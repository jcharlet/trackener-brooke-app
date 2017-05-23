import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import * as globalStyles from '../../../styles/global';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../../../util/utils";
import {ERROR_PASSWORD_MISMATCH,
    ERROR_PASSWORD_MISSING, ERROR_INVALID_PASSWORD, ERROR_PASSWORD_ALREADY_USED, ERROR_PREVIOUS_PASSWORD_MISSING
} from "./modifyPasswordActions";
import {ERROR_UNKNOWN, ERROR_SERVER, ERROR_FORBIDDEN, ERROR_UNAVAILABLE} from "../login/loginActions";
import HeaderComponent from "../../../components/HeaderComponent";
export default class ModifyPasswordScreen extends Component {

    state = {
        feedback: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.modifyPassword.feedback){
            case ERROR_PASSWORD_MISMATCH:
                this.state.feedback="the passwords do not match";
                break;
            case ERROR_PREVIOUS_PASSWORD_MISSING:
                this.state.feedback="please provide your previous password";
                break;
            case ERROR_INVALID_PASSWORD:
                this.state.feedback="your new password is invalid";
                break;
            case ERROR_PASSWORD_MISSING:
                this.state.feedback="please provide a password";
                break;
            case ERROR_PASSWORD_ALREADY_USED:
                this.state.feedback="please provide a new password"
                break;
            case ERROR_UNKNOWN:
                this.state.feedback="An error occurred"
                break;
            case ERROR_SERVER:
                this.state.feedback="An error occurred"
                break;
            case ERROR_UNAVAILABLE:
                this.state.feedback="Service is unavailable"
                break;
            default:
                this.state.feedback='';
        }
        const Dimensions = require('Dimensions');
        const window = Dimensions.get('window');
        return (
            <View style={[{
                flex:1
            }]}>
                <HeaderComponent
                    title={"Modify Password"}
                    navigation={this.props.navigation}
                    leftElement={HeaderComponent.leftIconType.BACK}
                    rightElement={'EMPTY'}
                />
                <KeyboardAvoidingView
                    contentContainerStyle={{
                            flex:1
                        }}
                    behavior='padding'
                    style={[{
                            flex:1
            }]}>
                    <Text style={[globalStyles.COMMON_STYLES.fontSizeSmall, {
                        textAlign:'center',
                        padding:4,
                    }]}>
                        Your password must be 6 digits long and can include any character
                    </Text>
                        <TextInput
                            style={{
                                height: 50,
                                fontSize:20,
                                textAlign:'center',
                                marginLeft:8,
                                marginRight:8,
                                color:'rgba(0,0,0,.625)',
                            }}
                            autoCorrect={false}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholder='Previous password'
                            onChangeText={(text) => this.props.modifyPassword.previousPassword=text}
                        />
                        <TextInput
                            style={{
                                height: 50,
                                fontSize:20,
                                textAlign:'center',
                                marginLeft:8,
                                marginRight:8,
                                color:'rgba(0,0,0,.625)',
                            }}
                            autoCorrect={false}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={(text) => this.props.modifyPassword.password=text}
                        />
                        <TextInput
                            style={{
                            height: 50,
                    fontSize:20,
        textAlign:'center',
        marginLeft:8,
        marginRight:8,
        color:'rgba(0,0,0,.625)',
                        }}
                            autoCorrect={false}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholder='Repeat password'
                            onChangeText={(text) => this.props.modifyPassword.repeatPassword=text}
                        />
                        <Text style={{
                                color:globalStyles.RED,
                                textAlign:'center',
                                height:22,
                            }}>
                            {this.state.feedback}
                        </Text>
                        <TouchableOpacity style={[{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',}
                    ]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                          onPress={() => {
                                              this.setState({feedback: ''});
                                              this.props.modifyPassword.feedback='';
                                              Keyboard.dismiss();
                                              this.props.doModifyPassword(this.props.modifyPassword.previousPassword,this.props.modifyPassword.password,this.props.modifyPassword.repeatPassword)
                                          }}>

                            <View
                                style={[globalStyles.COMMON_STYLES.buttonView,globalStyles.COMMON_STYLES.greenButton]}>
                                <Text style={[globalStyles.COMMON_STYLES.buttonText,{fontSize:20}]}>Save</Text>
                            </View>
                        </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

ModifyPasswordScreen.propTypes = {
    modifyPassword: PropTypes.any,
    doModifyPassword: PropTypes.func,
};
