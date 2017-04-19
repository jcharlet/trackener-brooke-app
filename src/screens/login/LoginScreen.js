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
    KeyboardAvoidingView
} from 'react-native';
import * as globalStyles from '../../styles/global';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../../util/utils";
export default class LoginScreen extends Component {

    state = {
        dataSource: {},
        username:'',
        password:'',
    };

    constructor(props) {
        super(props);
    }

    render() {
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
                        onChangeText={(text) => this.setState(
                            {
                                ...this.state,
                                username:text
                            })}
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
                        onChangeText={(text) => this.setState(
                            {
                                ...this.state,
                                password:text
                            })}
                    />
                            <TouchableOpacity style={[{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',}
                    ]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                              onPress={() => this.props.navigation.navigate('BottomTabNavContainer')}>

                                <View style={[globalStyles.COMMON_STYLES.buttonView,globalStyles.COMMON_STYLES.greenButton]}>
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
};
