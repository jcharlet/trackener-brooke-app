import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import * as globalStyles from '../../styles/global';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as utils from "../../util/utils";
import Pie from './chartsComponents/Pie';
import Theme from "./chartsComponents/theme";


export default class HackDetailsScreen extends Component {

    constructor(props) {
        super(props);
    }

    renderBrowsingButton(side) {
        switch (side) {
            case "LEFT":
                if (this.props.hasPreviousRide(this.props.hackDetails.index, this.props.hackDetails.rides.length)) {
                    return (
                        <TouchableOpacity activeOpacity={globalStyles.ACTIVE_OPACITY}
                                          onPress={this.props.showPreviousRide}

                                          style={{
                                  width:50
                        /*
                        borderStyle: 'solid',
                        borderColor: 'red',
                        borderWidth: 1,
                        height:50,

                        */
                     }}>
                            <Image source={require('../../../img/ic_navigate_prev_green.png')}
                                //    {/*style={globalStyles.COMMON_STYLES.infoBoxArrow}*/}
                            />
                        </TouchableOpacity>);
                }
                break;
            case "RIGHT":
                if (this.props.hasNextRide(this.props.hackDetails.index, this.props.hackDetails.rides.length)) {
                    return (
                        <TouchableOpacity activeOpacity={globalStyles.ACTIVE_OPACITY}
                                          onPress={this.props.showNextRide}

                                          style={{
                                  width:50
                        /*
                        borderStyle: 'solid',
                        borderColor: 'red',
                        borderWidth: 1,
                        height:50,

                        */
                     }}>
                            <Image source={require('../../../img/ic_navigate_next_green.png')}
                                //    {/*style={globalStyles.COMMON_STYLES.infoBoxArrow}*/}
                            />
                        </TouchableOpacity>);
                }
        }
        return <View style={{width:50}}><Text> </Text></View>;
    }

    renderHackBrowserTopBar() {
        let ride = this.props.hackDetails.rides[this.props.hackDetails.index];
        let date = utils.formatDateToDisplay(ride.date);
        let time = utils.formatTimeToDisplay(ride.date);
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
                            <View
                                style={[globalStyles.COMMON_STYLES.infoBoxView,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>
                                <Text
                                    style={[globalStyles.COMMON_STYLES.infoBoxText]}>TIME {"\n"} {utils.secondsToHourMinSec(Math.round(ride.analytics.duration))}</Text>
                            </View>
                            <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
                                <Text
                                    style={globalStyles.COMMON_STYLES.infoBoxText}>DISTANCE {"\n"} {utils.roundWithOneDecimals(ride.analytics.distance * utils.ONE_METER_IN_MILES)}
                                    mi</Text>
                            </View>


                        </View>
                        <View style={globalStyles.COMMON_STYLES.infoBox}>
                            <View
                                style={[globalStyles.COMMON_STYLES.infoBoxView,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>
                                <Text
                                    style={[globalStyles.COMMON_STYLES.infoBoxText]}>MAX SPEED {"\n"}
                                    {utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(ride.analytics.maxSpeed))}
                                    mph</Text>
                            </View>
                            <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
                                <Text
                                    style={[globalStyles.COMMON_STYLES.infoBoxText]}>AVG SPEED {"\n"}
                                    {utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(ride.analytics.avgSpeed))}
                                    mph</Text>
                            </View>
                        </View>

                        <View style={[globalStyles.COMMON_STYLES.centeredElement]}>
                            <Pie
                                pieWidth={130}
                                pieHeight={130}
                                onItemSelected={this._onPieItemSelected}
                                colors={Theme.colors}
                                width={200}
                                height={170}
                                data={ride.analytics.timeSpentByGait} />
                        </View>

                        <TouchableOpacity style={[globalStyles.COMMON_STYLES.centeredElement,
                    ]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                          onPress={() => {this.props.remove(this.props.hackDetails.rides[this.props.hackDetails.index].date,this.props.hackDetails.rides[this.props.hackDetails.index].analytics.distance)}}>

                            <View style={[globalStyles.COMMON_STYLES.buttonView,globalStyles.COMMON_STYLES.redButton]}>
                                <Text style={[globalStyles.COMMON_STYLES.buttonText]}>Remove</Text>
                            </View>
                        </TouchableOpacity>
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
    showPreviousRide: PropTypes.func,
    showNextRide: PropTypes.func,
    hasPreviousRide: PropTypes.func,
    hasNextRide: PropTypes.func,
    remove: PropTypes.func,
};
