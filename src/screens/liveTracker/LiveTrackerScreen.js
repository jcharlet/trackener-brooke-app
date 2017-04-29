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
import {NAV_HACK_DETAILS} from "../../actions/actionTypes";
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
        this.props.load();
        this.state = this.initialState;
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
                            style={[globalStyles.COMMON_STYLES.infoBoxText]}>TIME {"\n"} {utils.secondsToHourMinSec(Math.round(this.state.timer))}</Text>
                    </View>
                    <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
                        <Text
                            style={[globalStyles.COMMON_STYLES.infoBoxText]}>DISTANCE {"\n"} {utils.roundWithOneDecimals(this.props.liveTracker.ride.analytics.distance * utils.ONE_METER_IN_MILES)}
                            mi</Text>
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
                        <Text
                            style={[globalStyles.COMMON_STYLES.infoBoxText]}>SPEED {"\n"} {utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(this.props.liveTracker.ride.analytics.lastSpeed))}
                            mph</Text>
                    </View>
                    {/*<Text*/}
                    {/*style={[globalStyles.COMMON_STYLES.infoBoxText,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>MAX {"\n"} {utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(this.props.liveTracker.ride.analytics.maxSpeed))}*/}
                    {/*mph</Text>*/}
                    {/*<Text*/}
                    {/*style={[globalStyles.COMMON_STYLES.infoBoxText]}>AVG {"\n"} {utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(this.props.liveTracker.ride.analytics.avgSpeed))}*/}
                    {/*mph</Text>*/}
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
                        <Text style={globalStyles.COMMON_STYLES.infoBoxStartText}>
                            {totalDistance} mi ridden
                        </Text>
                        <View>
                            <Image source={require('../../../img/ic_navigate_next_green.png')}
                                   style={globalStyles.COMMON_STYLES.infoBoxArrow}/>
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
                        <HeaderComponent title={"Tracker"}/>
                        {this.renderDefaultScreen()}
                    </View>
                )
                break;
            case STATUS.PAUSE:
            case STATUS.START:
                return (
                    <View style={{flex: 1,alignItems: 'flex-start',}}>
                        <HeaderComponent title={"Tracker"}/>
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
    liveTracker: PropTypes.any,
    load: PropTypes.func,
    startTracking: PropTypes.func,
    stopTracking: PropTypes.func,
    pauseTracking: PropTypes.func,
    restartTracking: PropTypes.func,
};
