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
import * as globalStyles from '../../styles/global';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../../util/utils";
import {ERROR_UNKNOWN, ERROR_FORBIDDEN, ERROR_SERVER} from "./loginActions";
export default class LoginScreen extends Component {

    state = {
        feedback: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.login.feedback){
            case ERROR_UNKNOWN:
                this.state.feedback="An error occurred"
                break;
            case ERROR_SERVER:
                this.state.feedback="An error occurred"
                break;
            case ERROR_FORBIDDEN:
                this.state.feedback="Incorrect username/password"
                break;
            default:
                this.state.feedback='';
        }
        const Dimensions = require('Dimensions');
        const window = Dimensions.get('window');
        return (
            <Image source={require('../../../img/login-background.jpg')} style={[{
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
                        <Image source={require('../../../img/brooke_logo.png')} style={[{
    resizeMode: 'contain',
    width: 80,
    height: 100,
    alignSelf: 'center',
}]}/>
                        <Text style={{
                    fontSize:35,
                    textAlign:'center',
            }}>My Hackathon</Text>
                        <View style={{
                    flexDirection:'row',
                    alignItems:'center',
        justifyContent: 'center',
            }}>
                            <Text>by</Text>
                            <Image source={require('../../../img/trackener_logo.png')} style={[{
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
                            placeholder='Username'
                            onChangeText={(text) => this.props.login.username=text}
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

                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={(text) => this.props.login.password=text}
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
                                              this.props.login.feedback='';
                                              Keyboard.dismiss();
                                              this.props.doLogin(this.props.login.username,this.props.login.password)
                                          }}>

                            <View
                                style={[globalStyles.COMMON_STYLES.buttonView,globalStyles.COMMON_STYLES.greenButton]}>
                                <Text style={[globalStyles.COMMON_STYLES.buttonText,{fontSize:20}]}>Login</Text>
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
        textAlign:'center',
        color:globalStyles.GREEN
                        }}>register</Text>
                    </View>
                </KeyboardAvoidingView>
            </Image>
        );
    }
}

LoginScreen.propTypes = {
    Login: PropTypes.any,
    doLogin: PropTypes.func,
};
