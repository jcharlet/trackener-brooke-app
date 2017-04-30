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
import HeaderComponent from '../../components/HeaderComponent'


export default class HackDetailsScreen extends Component {

    constructor(props) {
        super(props);
        this.props.load();
    }

    renderBrowsingButton(side) {
        switch (side) {
            case "LEFT":
                if (this.props.hasPreviousHack(this.props.hackDetails.index, this.props.hackDetails.rides.length)) {
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
                            <Image source={require('../../../img/ic_navigate_prev_green.png')}
                                //    {/*style={globalStyles.COMMON_STYLES.infoBoxArrow}*/}
                            />
                        </TouchableOpacity>);
                }
                break;
            case "RIGHT":
                if (this.props.hasNextHack(this.props.hackDetails.index, this.props.hackDetails.rides.length)) {
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
            let timeSpentByGaitTable = ride.analytics.timeSpentByGait;
            timeSpentByGaitTable.map((element) => {
                element.name = utils.capitalizeFirstLetter(element.name);
                return element;
            })
            let distance = utils.roundWithOneDecimals(ride.analytics.distance * utils.ONE_METER_IN_MILES);
            let maxSpeed = utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(ride.analytics.maxSpeed));
            let avgSpeed = utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(ride.analytics.avgSpeed));
            let duration = utils.secondsToHourMinSec(Math.round(ride.analytics.duration));
            return (
                <View style={{flex: 1,alignItems: 'stretch'}}>
                    <HeaderComponent title={"Ride Details"}/>
                    {this.renderHackBrowserTopBar()}
                    <View style={globalStyles.COMMON_STYLES.container}>
                        <View style={globalStyles.COMMON_STYLES.infoBox}>
                            <View
                                style={[globalStyles.COMMON_STYLES.infoBoxView,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>
                                <Text
                                    style={[globalStyles.COMMON_STYLES.infoBoxText]}>Time {"\n"} {duration}</Text>
                            </View>
                            <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
                                <Text style={globalStyles.COMMON_STYLES.infoBoxText}>
                                    Distance {"\n"} {distance} mi
                                </Text>
                            </View>


                        </View>
                        <View style={globalStyles.COMMON_STYLES.infoBox}>
                            <View
                                style={[globalStyles.COMMON_STYLES.infoBoxView,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>
                                <Text style={[globalStyles.COMMON_STYLES.infoBoxText]}>
                                    Max speed {"\n"} {maxSpeed} mph
                                </Text>
                            </View>
                            <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
                                <Text
                                    style={[globalStyles.COMMON_STYLES.infoBoxText]}>Avg speed {"\n"}
                                    {avgSpeed} mph
                                </Text>
                            </View>
                        </View>

                        <View style={[globalStyles.COMMON_STYLES.centeredElement]}>
                            <Pie
                                pieWidth={130}
                                pieHeight={130}
                                onItemSelected={this._onPieItemSelected}
                                colors={Theme.colors}
                                width={190}
                                height={170}
                                data={timeSpentByGaitTable}/>
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
        <View style={{flex: 1,alignItems: 'stretch'}}>
            <HeaderComponent title={"Ride Details"}/>
            <View style={[globalStyles.COMMON_STYLES.container,{

                    flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

            }]}>
                <Text
                    style={[globalStyles.COMMON_STYLES.fontSizeLarge,{
                    textAlign:"center",
        padding: 20,
        color: globalStyles.GREEN,
        //borderStyle: 'solid',
        //borderColor: 'red',
        //borderWidth: 1
      }]}
                >No hack recorded</Text>
            </View>
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
    remove: PropTypes.func,
};
