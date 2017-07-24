import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    Button,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import * as globalStyles from '../../../styles/global';
import * as PropTypes from "prop-types";
import {ERROR_UNKNOWN, ERROR_FORBIDDEN, ERROR_SERVER, ERROR_UNAVAILABLE, LOGIN_FEEDBACK} from "./loginActions";
import {NAV_AUTHENT_REGISTER} from "../../../actions/actionTypes";

import {ViewPropTypes} from 'react-native'
export default class LoginScreen extends Component {
    static propTypes = {
        ...ViewPropTypes,
        Login: PropTypes.any,
        loginOnStartup: PropTypes.func,
        doLogin: PropTypes.func,
    };

    state = {
        feedback: '',
    };

    constructor(props) {
        super(props);
        this.props.loginOnStartup();
    }


    render() {
        let feedback;
        let feedbackColor = globalStyles.RED;
        switch (this.props.login.feedback) {
            case LOGIN_FEEDBACK.MISSING_USERNAME:
                feedbackColor = globalStyles.GREEN;
                feedback="Please provide a username";
                break;
            case LOGIN_FEEDBACK.MISSING_PASSWORD:
                feedbackColor = globalStyles.GREEN;
                feedback="Please provide a password";
                break;
            case LOGIN_FEEDBACK.ONGOING:
                feedbackColor = globalStyles.GREEN;
                feedback = "Sending request, please wait";
                break;
            case LOGIN_FEEDBACK.SUCCESS_OFFLINE:
                feedbackColor = globalStyles.GREEN;
                feedback = "Server unavailable, going offline...";
                break;
            case LOGIN_FEEDBACK.SUCCESS_ONLINE:
                feedbackColor = globalStyles.GREEN;
                feedback = "Authentication succeeded, loading...";
                break;
            case ERROR_UNKNOWN:
                feedback = "An error occurred"
                break;
            case ERROR_SERVER:
                feedback = "An error occurred"
                break;
            case ERROR_FORBIDDEN:
                feedback = "Incorrect username/password"
                break;
            case ERROR_UNAVAILABLE:
                feedback = "Service is unavailable"
                break;
            default:
                feedback = '';
        }
        this.state = {
            feedback: feedback,
        };

        const Dimensions = require('Dimensions');
        const window = Dimensions.get('window');
        return (
            <Image source={require('../../../../img/login-background.jpg')} style={[{
                width: window.width,
                height: window.height,
            }]}>
                <KeyboardAvoidingView
                    contentContainerStyle={{
                        flex: 1
                    }}
                    behavior='position'
                    style={[{
                        flex: 1
                    }]}>
                    <View style={[globalStyles.COMMON_STYLES.container, {
                        alignItems: 'stretch',
                        flexDirection: 'column',
                        flex: 1,
                        margin: 20,
                        marginBottom: 40,
                        borderStyle: 'solid',
                        borderColor: '#fff',
                        borderWidth: 1,
                        borderRadius: 16,
                        backgroundColor: '#fff',
                        padding: 16,
                        justifyContent: 'space-around',
                    }]}>
                        <Image source={require('../../../../img/brooke_logo.png')} style={[{
                            resizeMode: 'contain',
                            width: 80,
                            height: 100,
                            alignSelf: 'center',
                        }]}/>
                        <Text style={{
                            fontSize: 35,
                            textAlign: 'center',
                        }}>Trackener Ride</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text>by</Text>
                            <Image source={require('../../../../img/trackener_logo.png')} style={[{
                                marginLeft: 10,
                                resizeMode: 'contain',
                                width: 100,
                                height: 100,
                                alignSelf: 'center',
                            }]}/>
                        </View>

                        <TextInput
                            style={{
                                height: 50,
                                fontSize: 20,
                                textAlign: 'center',
                                marginLeft: 8,
                                marginRight: 8,
                                color: 'rgba(0,0,0,.625)',
                            }}
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholder='Username'
                            onChangeText={(text) => this.props.login.username = text}
                            defaultValue={this.props.login.username}
                        />
                        <TextInput
                            style={{
                                height: 50,
                                fontSize: 20,
                                textAlign: 'center',
                                marginLeft: 8,
                                marginRight: 8,
                                color: 'rgba(0,0,0,.625)',
                            }}
                            autoCorrect={false}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={(text) => this.props.login.password = text}
                            defaultValue={this.props.login.password}
                        />
                        <Text style={{
                            color: feedbackColor,
                            textAlign: 'center',
                            height: 22,
                        }}>
                            {this.state.feedback}
                        </Text>
                        <TouchableOpacity style={[{
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                        }
                        ]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                          onPress={() => {
                                              this.setState({feedback: ''});
                                              this.props.login.feedback = '';
                                              Keyboard.dismiss();
                                              this.props.doLogin(this.props.login.username, this.props.login.password)
                                          }}>

                            <View
                                style={[globalStyles.COMMON_STYLES.buttonView, globalStyles.COMMON_STYLES.greenButton]}>
                                <Text style={[globalStyles.COMMON_STYLES.buttonText, {fontSize: 20}]}>Login</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                alignSelf: 'flex-end',
                            }
                            ]}
                            activeOpacity={globalStyles.ACTIVE_OPACITY}
                            onPress={() => {
                                this.props.navigation.navigate(NAV_AUTHENT_REGISTER)
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: globalStyles.GREEN
                                }}>register</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Image>
        );
    }


}
