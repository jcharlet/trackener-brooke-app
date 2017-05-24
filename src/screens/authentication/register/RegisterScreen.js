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
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../../../util/utils";
import { ViewPropTypes } from 'react-native'
import {
    ERROR_PASSWORD_MISMATCH,
    ERROR_USERNAME_MISSING, ERROR_EMAIL_MISSING, ERROR_PASSWORD_MISSING, ERROR_INVALID_EMAIL, USERNAME_ALREADY_USED,
    EMAIL_ALREADY_USED, ERROR_PASSWORD_INVALID, FEEDBACK_REGISTER_SUCCESS, FEEDBACK_REGISTER_ONGOING
} from "./registerActions";
import {NAV_AUTHENT_LOGIN} from "../../../actions/actionTypes";
import {ERROR_UNKNOWN, ERROR_SERVER, ERROR_FORBIDDEN, ERROR_UNAVAILABLE} from "../login/loginActions";
export default class RegisterScreen extends Component {

    static propTypes = {
        ...ViewPropTypes,
        Login: PropTypes.any,
        doRegister: PropTypes.func,
    };

    state = {
        feedback: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        let feedback;
        let feedbackColor = globalStyles.RED;
        switch (this.props.register.feedback){
            case FEEDBACK_REGISTER_ONGOING:
                feedbackColor = globalStyles.GREEN;
                feedback="Sending request, please wait";
                break;
            case FEEDBACK_REGISTER_SUCCESS:
                feedbackColor = globalStyles.GREEN;
                feedback="Registration successful";
                break;
            case ERROR_PASSWORD_MISMATCH:
                feedback="The passwords do not match";
                break;
            case ERROR_USERNAME_MISSING:
                feedback="Please provide a username";
                break;
            case ERROR_EMAIL_MISSING:
                feedback="Please provide your email address";
                break;
            case ERROR_PASSWORD_MISSING:
                feedback="Please provide a password";
                break;
            case ERROR_PASSWORD_INVALID:
                feedback="Please provide a valid password";
                break;
            case ERROR_INVALID_EMAIL:
                feedback="Your email is invalid";
                break;
            case ERROR_UNKNOWN:
                feedback="An error occurred"
                break;
            case ERROR_SERVER:
                feedback="An error occurred"
                break;
            case EMAIL_ALREADY_USED:
                feedback="This email is already used"
                break;
            case USERNAME_ALREADY_USED:
                feedback="This username is already used"
                break;
            case ERROR_UNAVAILABLE:
                feedback="Service is unavailable"
                break;
            default:
                feedback='';
        }
        this.state ={
            feedback:feedback,
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
                            flex:1
                        }}
                    behavior='position'
                    style={[{
                            flex:1
            }]}>
                    <View style={[globalStyles.COMMON_STYLES.container,{
                    alignItems: 'stretch',
                    flexDirection:'column',
                    flex:1,
                    margin:20,
                    marginBottom:40,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 16,
        backgroundColor:'#fff',
        padding:16,
                    justifyContent: 'space-around',
            }]}>
                        <Image source={require('../../../../img/brooke_logo.png')} style={[{
    resizeMode: 'contain',
    width: 80,
    height: 100,
    alignSelf: 'center',
}]}/>
                        <Text style={{
                    fontSize:35,
                    textAlign:'center',
            }}>Trackener Ride</Text>
                        <View style={{
                    flexDirection:'row',
                    alignItems:'center',
        justifyContent: 'center',
            }}>
                            <Text>by</Text>
                            <Image source={require('../../../../img/trackener_logo.png')} style={[{
                            marginLeft:10,
    resizeMode: 'contain',
    width: 100,
    height: 100,
    alignSelf: 'center',
}]}/>
                        </View>

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
                            placeholder='Email'
                            onChangeText={(text) => this.props.register.email=text}
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
                            placeholder='Username'
                            onChangeText={(text) => this.props.register.username=text}
                        />

                        <Text style={[globalStyles.COMMON_STYLES.fontSizeSmall, {
                            textAlign:'center',
                            padding:4,
                            paddingTop:12,
                            paddingBottom:2,
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
                            placeholder='Password'
                            onChangeText={(text) => this.props.register.password=text}
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
                            onChangeText={(text) => this.props.register.repeatPassword=text}
                        />
                        <Text style={{
                                color:feedbackColor,
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
                                              this.props.register.feedback='';
                                              Keyboard.dismiss();
                                              this.props.doRegister(this.props.register.email,this.props.register.username,this.props.register.password,this.props.register.repeatPassword)
                                          }}>

                            <View
                                style={[globalStyles.COMMON_STYLES.buttonView,globalStyles.COMMON_STYLES.greenButton]}>
                                <Text style={[globalStyles.COMMON_STYLES.buttonText,{fontSize:20}]}>Register</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                alignSelf: 'flex-end',}
                                ]}
                            activeOpacity={globalStyles.ACTIVE_OPACITY}
                                          onPress={() => {
                                              this.props.navigation.navigate(NAV_AUTHENT_LOGIN)
                                          }}>
                        <Text
                            style={{
        textAlign:'center',
        color:globalStyles.GREEN
                        }}>login</Text>
                    </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Image>
        );
    }
}

