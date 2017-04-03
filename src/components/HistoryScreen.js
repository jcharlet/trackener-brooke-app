
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
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../util/utils";


export default class HistoryScreen extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={[globalStyles.COMMON_STYLES.container,{
                    flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
            }]}>
                <Text
                style={{
                    textAlign:"center",
        fontSize: 20,
        padding: 20,
        color: globalStyles.GREEN,
        //borderStyle: 'solid',
        //borderColor: 'red',
        //borderWidth: 1
                }}
                >Not available yet</Text>
            </View>);
    }
}

HistoryScreen.navigationOptions = {
    title: 'History',
};
//
// LiveTrackerScreen.propTypes = {
//     liveTracker:PropTypes.any,
//     startTracking: PropTypes.func,
//     stopTracking: PropTypes.func,
//     pauseTracking: PropTypes.func,
//     restartTracking: PropTypes.func,
// };

