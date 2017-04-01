
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


export default class HackDetailsScreen extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        if(this.props.hackDetails.rides && this.props.hackDetails.rides.length>0){
            let ride = this.props.hackDetails.rides[this.props.hackDetails.rides.length-1];
            return (
                <View>
                    <View><Text>{ride.date}</Text></View>
                    <View>
                        <View>
                            <View><Text>TIME</Text></View>
                            <View><Text>{ride.duration}</Text></View>
                        </View>
                        <View>
                            <View><Text>DISTANCE</Text></View>
                            <View><Text>{ride.distance}</Text></View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <View><Text>Max Speed</Text></View>
                            <View><Text>{ride.maxSpeed}</Text></View>
                        </View>
                        <View>
                            <View><Text>Avg Speed</Text></View>
                            <View><Text>{ride.avgSpeed}</Text></View>
                        </View>
                    </View>
                </View>

            );
        }
        return (
            <View><Text>No session recorded</Text></View>
        );
    }
}

HackDetailsScreen.propTypes = {
    hackDetails:PropTypes.any,
};

