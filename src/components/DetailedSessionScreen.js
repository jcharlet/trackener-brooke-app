
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


export default class DetailedSessionScreen extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return (<View><Text>Detailed session</Text></View>);
    }
}

DetailedSessionScreen.navigationOptions = {
    title: 'DetailedSession title',
};
//
// LiveTrackerPage.propTypes = {
//     liveTracker:PropTypes.any,
//     startTracking: PropTypes.func,
//     stopTracking: PropTypes.func,
//     pauseTracking: PropTypes.func,
//     restartTracking: PropTypes.func,
// };

