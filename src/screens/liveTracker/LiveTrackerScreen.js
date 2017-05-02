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
import {STATUS} from "./liveTrackerReducer";
import {NAV_HACK_DETAILS, NAV_LIVE_TRACKER} from "../../actions/actionTypes";
import BackgroundTimer from 'react-native-background-timer';
import moment from "moment";
import HeaderComponent from '../../components/HeaderComponent'

export default class LiveTrackerScreen extends Component {

    initialState = {
        timerIntervalId: null,
        timer: 0
    };


    constructor(props) {
        super(props);
        this.state= this.initialState;
    }

    componentDidMount(){
      this.props.checkLocationServicesIsEnabled();
    }

    startTimer() {
        let timerIntervalId = BackgroundTimer.setInterval(() => {
            this.incrementTimer();
        }, 100);
        this.setState({
            ...this.state,
            timerIntervalId: timerIntervalId,
        })
    }

    incrementTimer() {
        if (!this.props.liveTracker.ride) {
            return;
        }
        let timer = this.props.liveTracker.ride.pastDuration + (moment().valueOf() - this.props.liveTracker.ride.geoIds.startTime) / 1000;
        this.setState({
            ...this.state,
            timer: timer
        })
    }

    pauseTimer() {
        BackgroundTimer.clearInterval(this.state.timerIntervalId);
        this.setState({
            ...this.state,
            timerIntervalId: null,
        })
    }

    stopTimer() {
        BackgroundTimer.clearInterval(this.state.timerIntervalId);
        this.setState(this.initialState)
    }

    renderSecondButton() {
        switch (this.props.liveTracker.status) {
            default:
            case STATUS.START:
                return (
                    <TouchableOpacity style={[globalStyles.COMMON_STYLES.secondRideButton]}
                                      activeOpacity={globalStyles.ACTIVE_OPACITY}
                                      onPress={()=>{
                                          this.props.pauseTracking();
                                          this.pauseTimer();
                                      }}>
                        <Text style={globalStyles.COMMON_STYLES.secondRideButtonText}>Pause</Text>
                    </TouchableOpacity>
                );
            case STATUS.PAUSE:
                return (
                    <TouchableOpacity style={[globalStyles.COMMON_STYLES.secondRideButton]}
                                      activeOpacity={globalStyles.ACTIVE_OPACITY}
                                      onPress={()=>{
                                          this.props.restartTracking();
                                          this.startTimer();
                                      }}>
                        <Text style={[globalStyles.COMMON_STYLES.secondRideButtonText]}>Start</Text>
                    </TouchableOpacity>
                );
        }


    }

    renderTrackingStartedScreen() {
        let distance = utils.roundWithOneDecimals(this.props.liveTracker.ride.analytics.distance * utils.ONE_METER_IN_MILES);
        let speed = utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(this.props.liveTracker.ride.analytics.lastSpeed));
        let duration = utils.secondsToHourMinSec(Math.round(this.state.timer));
        return (
            <View style={globalStyles.COMMON_STYLES.container}>
                {/*<Text>totalDistance {((this.state.totalDistance))}{"\n"}*/}
                {/*duration {(this.state.duration)} {duration}{"\n"}*/}
                {/*distance {((this.state.distance))}{"\n"}*/}
                {/*lastPosition {JSON.stringify(this.state.lastPosition)}{"\n"}*/}
                {/*initialPosition {JSON.stringify(this.state.initialPosition)}{"\n"}*/}
                {/*error {JSON.stringify(this.state.error)}{"\n"}*/}
                {/*</Text>*/}
                <View style={globalStyles.COMMON_STYLES.infoBox}>
                    <View
                        style={[globalStyles.COMMON_STYLES.infoBoxView,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>
                        <Text
                            style={[globalStyles.COMMON_STYLES.infoBoxText]}>Time {"\n"} {duration}</Text>
                    </View>
                    <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
                        <Text style={[globalStyles.COMMON_STYLES.infoBoxText]}>
                            Distance {"\n"} {distance} mi
                        </Text>
                    </View>
                </View>

                <View style={[globalStyles.COMMON_STYLES.rideButtonsView]}>
                    {this.renderSecondButton()}
                    <TouchableOpacity
                        style={[globalStyles.COMMON_STYLES.startRideButton,globalStyles.COMMON_STYLES.withSecondRideButton]}
                        activeOpacity={globalStyles.ACTIVE_OPACITY}
                        onPress={() => {
                                      this.props.stopTracking(this.props.liveTracker.ride.analytics.distance);
                                      this.stopTimer();
                                  }}>
                        <Text
                            style={[globalStyles.COMMON_STYLES.startRideButtonText, globalStyles.COMMON_STYLES.withSecondRideButtonText]}>Stop</Text>
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.COMMON_STYLES.infoBox}>
                    <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
                        <Text style={[globalStyles.COMMON_STYLES.infoBoxText]}>
                            Speed {"\n"} {speed} mph
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    renderDefaultScreen() {
        let totalDistance = utils.roundWithOneDecimals(this.props.liveTracker.totalDistance * utils.ONE_METER_IN_MILES);
        return (
            <View style={[globalStyles.COMMON_STYLES.container]}>
                <TouchableOpacity style={globalStyles.COMMON_STYLES.infoBox}
                                  activeOpacity={globalStyles.ACTIVE_OPACITY}
                                  onPress={() => this.props.navigation.navigate(NAV_HACK_DETAILS)}>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent: 'flex-start',
                    }}>
                        <View>
                        <Image source={require('../../../img/trophy.png')} style={{
                            height: 40,
                            width: 40,
                            alignSelf: 'center',
                            flexGrow: 2,
                            resizeMode:'contain',
                            marginLeft:10,
                        }}/>
                        </View>
                        <Text style={[globalStyles.COMMON_STYLES.infoBoxStartText,{
                        /*fontSize:16,
                        alignSelf:'center',
                        flex:1,
                        textAlign: 'center',*/
                        }]}>
                                {totalDistance} mi ridden
                            </Text>
                    </View>
                    <View style={{
                        flex:0,
                        flexDirection:'row',
                        alignItems:'center'}}>
                        <Image source={require('../../../img/ic_navigate_next_green.png')}
                               style={globalStyles.COMMON_STYLES.infoBoxArrowTracker}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={globalStyles.COMMON_STYLES.startRideButton}
                                  activeOpacity={globalStyles.ACTIVE_OPACITY}
                                  onPress={()=>{
                                    this.props.startTracking();
                                    this.startTimer();
                                }}>
                    <Text style={globalStyles.COMMON_STYLES.startRideButtonText}>Start Ride</Text>
                </TouchableOpacity>


                <View style={[globalStyles.COMMON_STYLES.social]}>
                </View>

            </View>
        );
    }

    render() {
        switch (this.props.liveTracker.status) {
            case STATUS.STOP:
                return (
                    <View style={{flex: 1,alignItems: 'flex-start',}}>
                        <HeaderComponent
                            title={"My Hackathon"}
                            leftElement={HeaderComponent.leftIconType.TRACKENER_ICON}
                            rightElement={HeaderComponent.rightIconType.SETTINGS}
                            navigation={this.props.navigation}/>
                        {this.renderDefaultScreen()}
                    </View>
                )
                break;
            case STATUS.PAUSE:
            case STATUS.START:
                return (
                    <View style={{flex: 1,alignItems: 'flex-start',}}>
                        <HeaderComponent
                            title={"Tracker"}
                            navigation={this.props.navigation}
                        />
                        {this.renderTrackingStartedScreen()}
                    </View>
                )
                break;
            default:
                return null;
        }
    }
}

LiveTrackerScreen.propTypes = {
    liveTracker:PropTypes.any,
    startTracking: PropTypes.func,
    stopTracking: PropTypes.func,
    pauseTracking: PropTypes.func,
    restartTracking: PropTypes.func,
};
