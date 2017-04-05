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

export default class LiveTrackerScreen extends Component{

    constructor(props) {
        super(props);
    }


    renderSecondButton() {
        switch (this.props.liveTracker.status) {
            default:
            case utils.STATUS.START:
                return (
                    <TouchableOpacity style={[globalStyles.COMMON_STYLES.secondRideButton]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                      onPress={this.props.pauseTracking}>
                      <Text style={globalStyles.COMMON_STYLES.secondRideButtonText}>Pause</Text>
                    </TouchableOpacity>
                );
            case utils.STATUS.PAUSE:
                return (
                    <TouchableOpacity style={[globalStyles.COMMON_STYLES.secondRideButton]} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                      onPress={this.props.restartTracking}>
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
              <View style={[globalStyles.COMMON_STYLES.infoBoxView,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>
              <Text
                  style={[globalStyles.COMMON_STYLES.infoBoxText]}>TIME {"\n"} {utils.secondsToHourMinSec(Math.round(this.props.liveTracker.ride.analytics.duration))}</Text>
              </View>
                  <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
                  <Text
                      style={[globalStyles.COMMON_STYLES.infoBoxText]}>DISTANCE {"\n"} {utils.roundWithThreeDecimals(this.props.liveTracker.ride.analytics.distance * utils.ONE_METER_IN_MILES)}
                  mi</Text>
              </View>
              </View>

              <View style={[globalStyles.COMMON_STYLES.rideButtonsView]}>
                  {this.renderSecondButton()}
                <TouchableOpacity style={[globalStyles.COMMON_STYLES.startRideButton,globalStyles.COMMON_STYLES.withSecondRideButton]}
                                  activeOpacity={globalStyles.ACTIVE_OPACITY}
                                  onPress={this.props.stopTracking}>
                  <Text style={[globalStyles.COMMON_STYLES.startRideButtonText, globalStyles.COMMON_STYLES.withSecondRideButtonText]}>Stop</Text>
                </TouchableOpacity>
              </View>

              <View style={globalStyles.COMMON_STYLES.infoBox}>
              <View style={[globalStyles.COMMON_STYLES.infoBoxView]}>
              <Text
                  style={[globalStyles.COMMON_STYLES.infoBoxText]}>SPEED {"\n"} {utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(this.props.liveTracker.ride.analytics.lastSpeed))}
                      mi/h</Text>
                  </View>
                  {/*<Text*/}
                      {/*style={[globalStyles.COMMON_STYLES.infoBoxText,globalStyles.COMMON_STYLES.infoBoxBorderRight]}>MAX {"\n"} {utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(this.props.liveTracker.ride.analytics.maxSpeed))}*/}
                      {/*mi/h</Text>*/}
                  {/*<Text*/}
                      {/*style={[globalStyles.COMMON_STYLES.infoBoxText]}>AVG {"\n"} {utils.roundWithOneDecimals(utils.convertMeterPerSecondToMilesPerHour(this.props.liveTracker.ride.analytics.avgSpeed))}*/}
                      {/*mi/h</Text>*/}
              </View>
            </View>
        );
    }

    renderDefaultScreen() {
        //FIXME navigation weirdly behaves + crash to hack Details from total distance button
        return (
            <View style={[globalStyles.COMMON_STYLES.container]}>
              <TouchableOpacity style={globalStyles.COMMON_STYLES.infoBox} activeOpacity={globalStyles.ACTIVE_OPACITY}
              onPress={() => this.props.navigation.navigate('HackDetails')}>
                <Text
                    style={globalStyles.COMMON_STYLES.infoBoxStartText}>{utils.roundWithOneDecimals(this.props.liveTracker.totalDistance * utils.ONE_METER_IN_MILES)} mi ridden</Text>
                <Image source={require('../../img/ic_navigate_next_green.png')} style={globalStyles.COMMON_STYLES.infoBoxArrow}/>
              </TouchableOpacity>

              <TouchableOpacity style={globalStyles.COMMON_STYLES.startRideButton} activeOpacity={globalStyles.ACTIVE_OPACITY}
                                onPress={this.props.startTracking}>
                <Text style={globalStyles.COMMON_STYLES.startRideButtonText}>Start Ride</Text>
              </TouchableOpacity>


              <View style={[globalStyles.COMMON_STYLES.social]}>
              </View>

            </View>
        );
    }

    render(){
        switch (this.props.liveTracker.status) {
            case utils.STATUS.STOP:
                return this.renderDefaultScreen();
                break;
            case utils.STATUS.PAUSE:
            case utils.STATUS.START:
                return this.renderTrackingStartedScreen();
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
