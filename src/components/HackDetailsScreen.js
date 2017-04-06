import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import * as globalStyles from '../styles/global';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../util/utils";
import moment from "moment";


export default class HackDetailsScreen extends Component {

    constructor(props) {
        super(props);
        // AsyncStorage.setItem('rides', JSON.stringify([]));
        this.props.load();
    }

    formatDateToDisplay(dateTime) {
        if (moment(dateTime).format("YYYY MM DD") == moment().format("YYYY MM DD")) {
            return "TODAY"
        }
        return moment(dateTime).format("MMMM Do");
    }

    renderBrowsingButton(side){
        switch (side){
            case "LEFT":
                if (this.props.hasPreviousHack(this.props.hackDetails.index, this.props.hackDetails.rides.length)){
                    return (
                        <TouchableOpacity activeOpacity={globalStyles.ACTIVE_OPACITY}
                            onPress={this.props.showPreviousHack}

                                          style={{
                                  width:50
                        /*
                        borderStyle: 'solid',
                        borderColor: 'red',
                        borderWidth: 1,
                        height:50,

                        */
                     }}>
                        <Image source={require('../../img/ic_navigate_prev_green.png')}
                        //    {/*style={globalStyles.COMMON_STYLES.infoBoxArrow}*/}
                    />
                        </TouchableOpacity>);
                }
                break;
            case "RIGHT":
                if (this.props.hasNextHack(this.props.hackDetails.index, this.props.hackDetails.rides.length)){
                    return (
                        <TouchableOpacity activeOpacity={globalStyles.ACTIVE_OPACITY}
                                          onPress={this.props.showNextHack}

                                          style={{
                                  width:50
                        /*
                        borderStyle: 'solid',
                        borderColor: 'red',
                        borderWidth: 1,
                        height:50,

                        */
                     }}>
                            <Image source={require('../../img/ic_navigate_next_green.png')}
                                //    {/*style={globalStyles.COMMON_STYLES.infoBoxArrow}*/}
                            />
                        </TouchableOpacity>);
                }
        }
        return  <View style={{width:50}}><Text> </Text></View>;
    }

    renderHackBrowserTopBar() {
        let ride = this.props.hackDetails.rides[this.props.hackDetails.index];
        let date = this.formatDateToDisplay(ride.date);
        let time = moment(ride.date).format("HH:mm");
        return (
            <View style={{
                flex:0,
                flexDirection:"row",
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}>
                {this.renderBrowsingButton("LEFT")}
                <View style={{
                    flexGrow:2,
                    flex:1,
                flexDirection:"column",
                        height:50,
                        margin:5
                }}>
                    <Text style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
        fontSize: 22,
        fontWeight:'500',
        fontVariant: ['small-caps'],
        color: globalStyles.GREEN,
                     }}>
                        {date}
                    </Text>
                    <Text style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
        fontSize: 16,
        color: globalStyles.GREEN,
                     }}>
                        {time}
                    </Text>
                </View>
                {this.renderBrowsingButton("RIGHT")}
            </View>
        )
    }

    render() {
        if (this.props.hackDetails.rides && this.props.hackDetails.rides.length > 0) {
            let ride = this.props.hackDetails.rides[this.props.hackDetails.index];
            return (

                <View
                    style={{

        flex: 1,
        alignItems: 'flex-start'
                    }}
                >
                    {this.renderHackBrowserTopBar()}
                    <View style={globalStyles.COMMON_STYLES.container}>
                        <View style={globalStyles.COMMON_STYLES.infoBox}>
                        <View style={[globalStyles.COMMON_STYLES.infoBoxView,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>
                        <Text
                            style={[globalStyles.COMMON_STYLES.infoBoxText]}>TIME {"\n"} {utils.secondsToHourMinSec(Math.round(ride.analytics.duration))}</Text>
                        </View>
                        <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
                        <Text
                            style={globalStyles.COMMON_STYLES.infoBoxText}>DISTANCE {"\n"} {utils.roundWithThreeDecimals(ride.analytics.distance * utils.ONE_METER_IN_MILES)}
                            mi</Text>
                        </View>


                        </View>
                        <View style={globalStyles.COMMON_STYLES.infoBox}>
                        <View style={[globalStyles.COMMON_STYLES.infoBoxView,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>
                        <Text
                            style={[globalStyles.COMMON_STYLES.infoBoxText]}>MAX SPEED {"\n"}
                                {utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(ride.analytics.maxSpeed))}
                                mi/h</Text>
                            </View>
                                <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
                                <Text
                                    style={[globalStyles.COMMON_STYLES.infoBoxText]}>AVG SPEED {"\n"}
                                {utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(ride.analytics.avgSpeed))}
                                mi/h</Text>
                            </View>
                        </View>
                    </View>
                </View>

            );
        }
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
                    >No hack recorded</Text>
                </View>
        );
    }
}

HackDetailsScreen.propTypes = {
    hackDetails: PropTypes.any,
    load: PropTypes.func,
    showPreviousHack: PropTypes.func,
    showNextHack: PropTypes.func,
    hasPreviousHack: PropTypes.func,
    hasNextHack: PropTypes.func,
};


// export const COMMON_STYLES = StyleSheet.create(
//     {
//         infoBox: {
//             borderStyle: 'solid',
//             borderColor: globalStyles.GREEN,
//             borderWidth: 2,
//
//             flexDirection: 'row',
//             alignSelf: 'stretch',
//             width: undefined,
//             margin: 20,
//         },
//         infoBoxStartText: {
//             fontSize: 30,
//             padding: 20,
//             color: globalStyles.GREEN,
//             alignItems: 'center',
//             flexGrow: 3,
//             textAlign: 'center',
//             paddingLeft: 70
//         },
//         infoBoxText: {
//             fontSize: 20,
//             padding: 20,
//             color: globalStyles.GREEN,
//             alignItems: 'center',
//             flexGrow: 1,
//             textAlign: 'center',
//         },
//         infoBoxBorderRight: {
//             borderRightColor: globalStyles.GREEN,
//             borderStyle: 'solid',
//             borderRightWidth: 1,
//         },
//         infoBoxArrow: {
//             alignSelf: 'center',
//             flexGrow: 2,
//             width: 30,
//             height: 30
//         },
//     });
